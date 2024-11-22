<template>
  <div class="">
    <a href="#" target="_blank" rel="noreferrer noopener"
       class="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white ring ring-orange-100">
<!--      <div class="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-orange-100 animate-ping"></div>-->
      <div class="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-orange-100 animate-[ping_2s_ease-in-out_infinite]"></div>
      <div class="relative z-20">
        <NuxtImg src="/icons/LogoFloat.svg" alt="MetricGPT" class="rounded-full"/>
      </div>
    </a>

    <div class="bg-white rounded-lg shadow-md p-4">
      <!-- Chat Header -->
      <div class="flex items-center">
        <div class="ml-3">
          <p class="text-xl font-medium">Metric GPT</p>
          <!--              <p class="text-gray-500 mt-1">Hỏi về báo cáo Kem dưỡng ẩm</p>-->
        </div>
      </div>
      <!--          <UDivider class="my-3" size="2xs" />-->

      <!-- Chat Messages -->
      <div class="space-y-4 mt-4" style="min-height: 300px;">
        <div class="" v-for="item in messages" :key="item.id">
          <div v-if="item.sender === 'bot'" class="flex items-start">
            <NuxtImg src="/icons/LogoIcon.svg" alt="MetricGPT" class="w-8 h-8 rounded-full"/>

            <!--            <div class="w-8 h-8 rounded-full ring-2 ring-gray-300 flex items-center">-->
            <!--              <NuxtImg src="/icons/LogoIcon.svg" alt="MetricGPT" class="w-5 h-5"/>-->
            <!--            </div>-->
            <div class="ml-3 bg-gray-100 p-3 rounded-lg inline-flex items-end">
              <div class="text-sm text-gray-800 prose" v-html="micromark(item.text)"></div>
            </div>
          </div>

          <div v-else-if="item.sender === 'user'" class="flex items-end justify-end">
            <div class="bg-blue-500 p-3 rounded-lg">
              <div class="text-sm text-white prose" v-html="micromark(item.text)"></div>
            </div>
            <!--                              <img src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"-->
            <!--                                   alt="Other User Avatar" class="w-8 h-8 rounded-full ml-3"/>-->
          </div>

        </div>
        <div class="flex space-x-1 ml-6" v-if="isTyping">
          <span v-for="dot in 3" :key="dot" class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
        </div>

      </div>
      <UDivider class="my-4" size="2xs"/>
      <div class="" v-if="!isTyping">
        <div class="text-sm text-gray-800 mb-2">Gợi ý câu hỏi:</div>
        <div class="inline-flex space-x-3 flex-wrap items-start">
          <UButton v-for="question in lstSuggestion" :key="question" color="blue" variant="outline" class="mb-2"
                   @click="onClickSuggestion(question)">{{ question }}
          </UButton>
        </div>

      </div>
      <!-- Chat Input -->
      <div class="mt-4 flex items-start space-x-3">
        <!--            @keyup.enter="sendMessage"-->
        <UTextarea
            v-model="inputMessage"
            @keydown.enter.exact.prevent="sendMessage"
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

const reportName = 'Nồi chiên không dầu';
const reportId = 4008;
let messages = ref([
  {
    id: 1,
    text: `Xin chào, Metric GPT mời bạn đặt câu hỏi về báo cáo thị trường ${reportName}?`,
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

const lstSuggestion = computed(() => lstSuggestionAll.filter((question) => !lstSuggestionClicked.value.includes(question)).slice(0, 2))


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
  // console.log(lstChatHistory)
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
    const urlApi = "https://api-ereport.staging.muadee.vn/api/metricgpt/chat";
    const response = await $fetch(urlApi, options);
    // console.log(`prepare to read stream ${response}`);
    // Xử lý stream từ API
    const reader = response.pipeThrough(new TextDecoderStream()).getReader();

    let botMessage = "";
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        // console.log("Stream done");
        break
      }
      // chunk message by pattern data: json
      console.log(`value: ${value}`)
      const chunks = value.trim().split("\n");
      for (const chunk of chunks) {
        // console.log(`chunk: ${chunk}`);
        if (chunk.startsWith("data:")) {
          // console.log(chunk.slice(5).trim());
          const data = JSON.parse(chunk.slice(5).trim()); // Bỏ prefix "data:"
          if (data !== null) {
            const {event, chunk_message, output_message} = data;
            // console.log(`${event}`);
            if (event === 'on_chat_model_stream') {
              // console.log(chunk_message);
              botMessage += chunk_message;
              updateBotMessage(botMessage, false)
            } else if (event === 'on_chat_model_end') {
              botMessage = output_message || botMessage;
              updateBotMessage(botMessage, true)
              isTyping.value = false;
              // console.log(output_message);
              break
            }
          }
        }
      }
    }
  } catch (error) {
    // todo: handle error not update bot message
    console.error("Error invoking Metric GPT:", error);
    updateBotMessage("Lỗi khi gọi API. Vui lòng thử lại.", true)
    isTyping.value = false;
  }
};

const sendMessage = async () => {
  const text = inputMessage.value
  if (text) {
    inputMessage.value = '';
    await sendQuestion(text);
  }
};

const sendQuestion = async (text) => {
  messages.value.push({id: Date.now(), text: text, sender: 'user'});
  let lstChatHistory = []
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
  // console.log(lstSuggestionClicked.value)
  await sendQuestion(question);
}

</script>

<style lang="scss" scoped>
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
  word-wrap: break-word;
  //white-space: pre-wrap;
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
  word-wrap: break-word;
  //white-space: pre-wrap;
}

</style>

<style lang="scss">
.md-gpt {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  //color: #333;
  //background-color: #f9f9f9;
  //padding-left: 10px;
  //padding-right: 10px;
  border-radius: 5px;

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    margin: 10px 0;
  }

  ul, ol {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }

  a {
    color: #1890ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f4f4f4;
    padding: 2px 4px;
    border-radius: 3px;
  }

  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }

  blockquote {
    border-left: 4px solid #ccc;
    padding-left: 10px;
    color: #666;
    margin: 10px 0;
  }

  strong {
    font-weight: bold;
  }
}
</style>
