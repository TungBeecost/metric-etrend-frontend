<template>
  <div class="container">
    <div class="chat-container">

      <div class="chat-messages">
        <div v-for="item in messages" :key="item.id" :class="item.sender === 'bot' ? 'bot-message' : 'user-message'">
          <div :class="item.sender === 'bot' ? 'bot-content' : 'user-content'">
            <div class="md-gpt" v-html="micromark(item.text)"></div>
          </div>
        </div>
      </div>

      <a-input
          v-model:value="inputMessage"
          @pressEnter="sendMessage"
          placeholder="Đặt câu hỏi cho Metric GPT"
      />
    </div>
  </div>
</template>

<script setup>
import {micromark} from 'micromark'

const reportName = 'Kem dưỡng ẩm';
const messages = ref([
  {
    id: 1,
    text: `Xin chào, Metric GPT mời bạn đặt câu hỏi về báo cáo thị trường ${reportName}?`,
    // text: `Thị trường kem dưỡng ẩm tại Việt Nam đang phát triển mạnh mẽ, song song với sự gia tăng nhận thức về chăm sóc da và sự bùng nổ của thương mại điện tử.  Để có cái nhìn tổng quan, chúng ta cần phân tích theo nhiều khía cạnh:\n\n**1. Phân khúc thị trường:**\n\n* **Theo giá:** Thị trường có sự phân chia rõ rệt giữa các sản phẩm bình dân, tầm trung và cao cấp.  Mỗi phân khúc nhắm đến nhóm khách hàng khác nhau với nhu cầu và khả năng chi trả khác nhau.  Phân khúc bình dân có sức cạnh tranh cao, trong khi phân khúc cao cấp tập trung vào chất lượng và thành phần đặc biệt.\n* **Theo loại da:** Kem dưỡng ẩm được phân loại theo từng loại da: da khô, da dầu, da hỗn hợp, da nhạy cảm.  Sự đa dạng này đáp ứng nhu cầu cá nhân hóa ngày càng cao của người tiêu dùng.\n* **Theo chức năng:** Ngoài chức năng dưỡng ẩm cơ bản, kem dưỡng ẩm còn được bổ sung thêm nhiều chức năng khác như chống lão hóa, làm trắng da, trị mụn, chống nắng…  Sự kết hợp nhiều chức năng trong một sản phẩm đang là xu hướng.\n* **Theo thương hiệu:** Thị trường có sự hiện diện của cả thương hiệu nội địa và quốc tế. Thương hiệu quốc tế thường chiếm lĩnh phân khúc cao cấp với công nghệ và chất lượng được đánh giá cao, trong khi thương hiệu nội địa đang dần khẳng định vị thế với giá cả cạnh tranh và hiểu biết sâu sắc về làn da người Việt.\n* **Theo kênh phân phối:**  Kênh phân phối chính là các cửa hàng mỹ phẩm, siêu thị, cửa hàng tiện lợi và đặc biệt là thương mại điện tử (Shopee, Lazada, Tiki...).  Thương mại điện tử đang đóng vai trò ngày càng quan trọng trong việc tiếp cận khách hàng và thúc đẩy doanh số.\n\n\n**2. Xu hướng thị trường:**\n\n* **Nhận thức về chăm sóc da tăng cao:** Người tiêu dùng ngày càng quan tâm đến việc chăm sóc da và sẵn sàng đầu tư vào các sản phẩm chất lượng cao.\n* **Cá nhân hóa sản phẩm:**  Xu hướng cá nhân hóa sản phẩm đang ngày càng được chú trọng.  Các sản phẩm được thiết kế riêng cho từng loại da và nhu cầu cụ thể.\n* **Thành phần tự nhiên và hữu cơ:**  Người tiêu dùng ngày càng ưa chuộng các sản phẩm có thành phần tự nhiên và hữu cơ, an toàn cho da và môi trường.\n* **Sự phát triển của thương mại điện tử:**  Thương mại điện tử đóng vai trò quan trọng trong việc phân phối và tiếp cận khách hàng.\n* **Marketing online:** Các chiến dịch marketing online như quảng cáo trên mạng xã hội, influencer marketing đang được các thương hiệu sử dụng rộng rãi.\n\n\n**3. Thách thức thị trường:**\n\n* **Cạnh tranh khốc liệt:** Thị trường kem dưỡng ẩm có tính cạnh tranh rất cao, đặc biệt là ở phân khúc bình dân.\n* **Hàng giả, hàng nhái:**  Việc kiểm soát hàng giả, hàng nhái trên thị trường vẫn là một thách thức lớn.\n* **Thay đổi xu hướng nhanh chóng:**  Người tiêu dùng dễ bị ảnh hưởng bởi các xu hướng mới, đòi hỏi các thương hiệu phải liên tục đổi mới sản phẩm và chiến lược.\n\n\n**4.  Dữ liệu cần thiết để phân tích sâu hơn:**\n\nĐể có phân tích chi tiết hơn, cần có dữ liệu về:\n\n* Doanh số bán hàng của các sản phẩm kem dưỡng ẩm theo từng phân khúc.\n* Thị phần của các thương hiệu kem dưỡng ẩm.\n* Xu hướng tìm kiếm sản phẩm kem dưỡng ẩm trên các công cụ tìm kiếm.\n* Phản hồi của khách hàng về các sản phẩm kem dưỡng ẩm trên các trang thương mại điện tử.\n* Chi phí quảng cáo và marketing của các thương hiệu kem dưỡng ẩm.\n\n\n**Kết luận:**\n\nThị trường kem dưỡng ẩm tại Việt Nam đang phát triển mạnh mẽ với nhiều cơ hội và thách thức.  Việc hiểu rõ phân khúc thị trường, xu hướng tiêu dùng và cạnh tranh là rất quan trọng đối với các doanh nghiệp hoạt động trong lĩnh vực này.  Để có phân tích chi tiết hơn, cần thu thập và phân tích dữ liệu cụ thể hơn.\n`,
    sender: 'bot',
    complete: true
  },
]);
// console.log(micromark('**Hello**'))
const isTyping = ref(false);
const inputMessage = ref('');

const data = ref([]);
const error = ref(null);


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
  console.log(lstChatHistory)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: {
      thread_id: "test-kem-duong-am",
      // query: query,
      lst_chat_history: lstChatHistory,
    },
    responseType: "stream",
  };

  try {
    const response = await $fetch("http://localhost:8000/chat", options);
    // Xử lý stream từ API
    const reader = response.pipeThrough(new TextDecoderStream()).getReader();

    let botMessage = "";
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        console.log("Stream done");
        break
      }
      // chunk message by pattern data: json

      const chunks = value.trim().split("\n");
      for (const chunk of chunks) {
        // console.log(chunk);
        if (chunk.startsWith("data:")) {
          console.log(chunk.slice(5).trim());
          const data = JSON.parse(chunk.slice(5).trim()); // Bỏ prefix "data:"
          if (data !== null) {
            const {event, chunk_message, output_message} = data;
            // console.log(event);
            if (event === 'on_chat_model_stream') {
              // console.log(chunk_message);
              botMessage += chunk_message;
              updateBotMessage(botMessage, false)
            } else if (event === 'on_chat_model_end') {
              botMessage = output_message || botMessage;
              updateBotMessage(botMessage, true)
              isTyping.value = true;
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
    isTyping.value = true;
  }
};

const sendMessage = async () => {

  if (inputMessage.value.trim()) {
    messages.value.push({id: Date.now(), text: inputMessage.value.trim(), sender: 'user'});
    inputMessage.value = '';
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
};
</script>

<style lang="scss" scoped>
.container {
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
