<template>
  <div class="">
    <a href="#" target="_blank" rel="noreferrer noopener"
       class="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white ring ring-orange-100">
<!--      <div class="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-orange-100 animate-ping"></div>-->
      <div class="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-orange-100 animate-[ping_1s_ease-in-out_infinite]"></div>
      <div class="relative z-20">
        <!--        <svg fill="#fff" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
        <!--             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308.00 308.00" xml:space="preserve" stroke="#fff"-->
        <!--             transform="matrix(1, 0, 0, 1, 0, 0)">-->
        <!--          <path-->
        <!--              d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"/>-->
        <!--          <path-->
        <!--              d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"/>-->
        <!--    </svg>-->
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
