<template>
  <div class="">
    <div class="bg-white rounded-lg shadow-md p-4">
      <!-- Chat Messages -->
      <div
          class="space-y-4 mt-4 height_box_chat"
          :class="fullScreen ? 'full-screen-chat' : ''"
          :style="{ height: fullScreen ? 'calc(100vh - 360px)' : '' }"
      >
        <div class="" v-for="item in messages" :key="item.id">
          <div v-if="item.sender === 'bot'" class="flex items-start">
            <NuxtImg src="/images/logo-square.svg" alt="MetricGPT" class="w-8 h-8 rounded-full"/>
            <div class="ml-3 bg-gray-100 p-3 rounded-lg inline-flex items-end">
              <div class="text-sm text-gray-800 prose max-ch-80" v-html="micromark(item.text)"></div>
            </div>
          </div>

          <div v-else-if="item.sender === 'user'" class="flex items-end justify-end">
            <div class="bg-blue-500 p-3 rounded-lg">
              <div class="text-sm text-white prose max-ch-80" v-html="micromark(item.text)"></div>
            </div>
          </div>

        </div>
        <div class="flex space-x-1 ml-6" v-if="isTyping">
          <span v-for="dot in 3" :key="dot" class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
        </div>
      </div>

      <UDivider class="my-4" size="2xs"/>

      <div>
        <div class="text-sm text-gray-600 mb-2 font-bold">Gợi ý câu hỏi:</div>
        <div class="inline-flex space-x-3 items-start overflow-x-auto overflow-hidden w-full">
          <UButton
              :disabled="isTyping"
              v-for="question in lstSuggestion"
              :key="question"
              color="blue"
              variant="outline"
              class="mb-2"
              @click="onClickSuggestion(question)"
          >
            {{ question }}
          </UButton>
        </div>
      </div>

      <div class="mt-4 flex items-start space-x-3">
        <UTextarea
            v-model="inputMessage"
            @keydown.enter.exact.prevent="sendMessage"
            :disabled="isTyping"
            size="lg"
            variant="none"
            type="text"
            :rows="1"
            :maxrows="5"
            autoresize
            placeholder="Đặt câu hỏi cho Metric GPT"
            class="flex-1 py-2 px-3 rounded-lg bg-gray-100 focus:outline-none"
        />

        <UButton
            :disabled="isTyping"
            icon="i-material-symbols-send"
            size="lg"
            color="primary"
            variant="solid"
            label="Gửi"
            :trailing="false"
            @click="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {micromark} from 'micromark'

const props = defineProps({
  name: {
    type: String,
  },
  id: {
    type: Number,
  },
  fullScreen: {
    type: Boolean,
  },
});

const reportName = props.name;
const reportId = props.id;
const config = useRuntimeConfig();
let messages = ref([
  {
    id: 1,
    text: `Xin chào, **Metric GPT** mời bạn đặt câu hỏi về báo cáo thị trường **${reportName}** ?`,
    sender: 'bot',
    complete: true
  },
]);
const isTyping = ref(false);
const inputMessage = ref('');

const lstSuggestionAll = [
  'Đánh giá tổng quan thị trường',
  'Quy mô sàn Shopee, Tiktok',
  'Phân khúc giá phổ biến',
  'Top 5 thương hiệu bán chạy',
  'Top 5 thương hiệu trên TikTok',
  'Top 5 sản phẩm bán chạy',
  'Phân tích insight khách hàng',
  'Phân nhóm khách hàng phù hợp',
  'Chiến lược marketing hiệu quả',
  'Các chủ đề nội dung phù hợp để trên Tiktok',
]
const lstSuggestionClicked = ref([])

const lstSuggestion = computed(() => lstSuggestionAll.filter((question) => !lstSuggestionClicked.value.includes(question)))


// Hàm cập nhật giao diện theo từng chunk
const updateBotMessage = (text, isComplete) => {
  if (isComplete) {
    // replace last message
    const botMessage = messages.value.find((msg) => msg.sender === "bot" && !msg.complete);
    if (botMessage) {
      botMessage.text = text;
      botMessage.complete = true;
    } else {
      messages.value.push({id: Date.now(), text, sender: "bot", complete: true});
    }
  } else {
    const botMessage = messages.value.find((msg) => msg.sender === "bot" && !msg.complete);
    if (botMessage) {
      botMessage.text = text;
    } else {
      messages.value.push({id: Date.now(), text, sender: "bot", complete: false});
    }
  }
};

// Hàm xử lý streaming từ API
const invokeMetricGPT = async (lstChatHistory = null) => {
  isTyping.value = true;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "transfer-encoding": "chunked",
      "Accept": "text/event-stream",
    },
    body: {
      thread_id: "test-kem-duong-am",
      lst_chat_history: lstChatHistory,
      report_id: reportId
    },
    responseType: "stream",
  };

  try {
    // const urlApi = "http://localhost:8000/api/metricgpt/chat";
    // const urlApi = "http://localhost:8000/chat";
    const urlApi = `${config.public.API_ENDPOINT}/api/metricgpt/chat`;
    const response = await $fetch(urlApi, options);
    const reader = response.pipeThrough(new TextDecoderStream()).getReader();

    let botMessage = "";
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      const chunks = value.trim().split("\n");
      for (const chunk of chunks) {
        if (chunk.startsWith("data:")) {
          const data = JSON.parse(chunk.slice(5).trim());
          if (data !== null) {
            const {event, chunk_message, output_message} = data;
            if (event === 'on_chat_model_stream') {
              botMessage += chunk_message;
              updateBotMessage(botMessage, false);
            } else if (event === 'on_chat_model_end') {
              botMessage = output_message || botMessage;
              updateBotMessage(botMessage, true);
              isTyping.value = false;
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error invoking Metric GPT:", error);
    updateBotMessage("Lỗi khi gọi API. Vui lòng thử lại.", true);
    isTyping.value = false;
  }
};

const sendMessage = async () => {
  const text = inputMessage.value;
  if (text) {
    inputMessage.value = '';
    await sendQuestion(text);
  }
};

const sendQuestion = async (text) => {
  messages.value.push({id: Date.now(), text: text, sender: 'user'});
  let lstChatHistory = [];
  for (let i = 1; i < messages.value.length; i++) {
    const message = messages.value[i];
    if (message.sender === 'user') {
      lstChatHistory.push({sender: 'user', text: message.text});
    } else {
      lstChatHistory.push({sender: 'bot', text: message.text});
    }
  }

  await invokeMetricGPT(lstChatHistory);
}

const onClickSuggestion = async (question) => {
  lstSuggestionClicked.value.push(question);
  await sendQuestion(question);
}
</script>


<style scoped lang="scss">
.container-metric {
  max-width: 1400px;
  margin: 0 auto;
}

.chatbot-layout {
  height: 100vh;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.chat-messages {
  overflow-y: auto;
  flex-grow: 1;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.chat-message {
  display: flex;
}

.bot-message {
  display: inline-flex;
  text-align: left;
  justify-content: flex-start;
  background-color: #f0f0f0;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.user-message {
  justify-content: flex-end;
  display: inline-flex;
  text-align: right;
  background-color: #1890ff;
  color: white;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.height_box_chat {
  //height: 300px;
  height: max(300px, calc(80vh - 250px));
  overflow-y: auto;
  transition: height 0.3s ease;
}

//.max-ch-80 {
//  max-width: 80ch;
//}
</style>
