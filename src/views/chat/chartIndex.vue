<template>
  <div class="chatPage">
    <div class="sildeLeft">
      <div class="chatHistoryList">
        <div
          class="chatHistoryItem"
          v-for="item in historyList"
          :key="item.time"
        >
          <i class="iconfont icon-jichuxinxiguanli"></i>
          <div class="title">{{ item.name }}</div>
          <div class="editMenu">
            <i class="iconfont icon-bianji"></i>
            <i class="iconfont icon-shanchu"></i>
          </div>
        </div>
        <div class="chatHistoryItem new">
          <i class="iconfont icon-jichuxinxiguanli"></i>新聊天
        </div>
      </div>
      <div class="chatUserInfo">
        <div class="chatUserInfoLeft">
          <img
            class="chatUserInfoImg"
            src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
          />
          <div class="chatUserInfoDesc">
            <p class="chatUserInfoName">YULEIAI</p>
            <p class="chatUserInfoIntro">麦田里的守望者</p>
          </div>
        </div>
        <div class="chatUserInfoRight">
          <i class="iconfont icon-peizhizhongxin"></i>
        </div>
      </div>
    </div>
    <div class="chatCon">
      <div class="chatMessageList">
        <div
          class="messageItem"
          v-for="(item, index) in messageList"
          :class="[item.role == 'user' ? 'right' : 'left']"
          :key="index"
        >
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">{{ item.timeStr }}</div>
            <div class="messageDetailText">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="chatMessageSend">
        <div class="iconBtn deleteBtn">
          <i class="iconfont icon-shanchu"></i>
        </div>
        <div class="iconBtn saveBtn">
          <i class="iconfont icon-daochu"></i>
        </div>
        <div class="iconBtn triggerBtn">
          <i class="iconfont icon-zaixianyonghu"></i>
        </div>
        <div class="sendMessage">
          <div class="sendMessageText">
            <textarea placeholder="请输入消息" v-model="sendMessageText" />
          </div>
        </div>
        <div class="sendBtn" @click="sendMessage">
          <i class="iconfont icon-fasong"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/idea.css";
export default {
  name: "chartIndex",
  components: {
    // VMdPreview, // 注入组件
  },
  data() {
    return {
      sendMessageText: "",
      messageList: [],
      historyList: [],
    };
  },
  async mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "javascript";
        return hljs.highlight(code, { language: validLanguage }).value;
      },
      langPrefix: "hljs language-",
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  },
  methods: {
    sendMessage() {
      if (!this.sendMessageText) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "请先填写内容",
          type: "warning",
        });
        return;
      }
      const pushData = {
        role: "user",
        content: this.sendMessageText,
      };
      const answerData = {
        role: "assistant",
        content: "正在回答中",
      };
      this.messageList.push(pushData);
      this.messageList.push(answerData);
      this.getAnswer();
    },
    async getAnswer() {
      const abortController = new AbortController();
      const pushList = this.messageList.slice(0, this.messageList.length - 1);
      const upIndex = this.messageList.length - 1;
      try {
        const response = await fetch("http://82.156.167.136/chatNew", {
          signal: abortController.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pushList),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let flag = true;
        this.messageList[upIndex].content = "";
        this.sendMessageText = "";
        while (flag) {
          const { value, done } = await reader.read();
          if (value) {
            const partialResponse = decoder.decode(value, {
              stream: true,
            });
            console.log(partialResponse);
            if (partialResponse.indexOf("DONE") >= 0) {
              const nowData = this.messageList[upIndex].content;
              this.messageList[upIndex].content =
                nowData + partialResponse.replace("DONE", "");
              abortController.abort();
            } else {
              const nowData = this.messageList[upIndex].content;
              this.messageList[upIndex].content = nowData + partialResponse;
            }
          }
          if (done) {
            flag = false;
            abortController.abort();
            break;
          }
        }
      } catch (error) {
        abortController.abort();
      }
    },
  },
};
</script>
<style lang="scss">
.backHtmlWrap {
  white-space: pre-line;
  p {
    white-space: pre-line;
  }
  code {
    background: #42b983;
    display: inline-block;
    border-radius: 5px;
    padding: 0 5px;
    line-height: 26px;
    white-space: pre-line;
  }
}
</style>
<style lang="scss" scoped>
.chatPage {
  background: #101014;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: "myFont";
  .sildeLeft {
    width: 300px;
    height: 100vh;
    overflow: auto;
    background: #18181c;
    border-right: 1px solid #48484e;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    .chatHistoryList {
      height: calc(100vh - 100px);
      &::-webkit-scrollbar {
        width: 6px;
        border: 1px solid transparent;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #dddddd;
        border-radius: 3px;
      }
      .chatHistoryItem {
        width: 260px;
        margin: 20px auto 0;
        border: 1px solid #18181c;
        background: #24272e;
        display: flex;
        justify-content: flex-start;
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        &.new {
          background: #18181c;
          border: 1px dotted #fff;
          text-align: center;
          color: #fff;
          justify-content: center;
          line-height: 50px;
          .icon-jichuxinxiguanli {
            color: #fff;
            margin-right: 10px;
            margin-left: 0;
            margin-top: 0;
          }
        }
        .icon-jichuxinxiguanli {
          font-size: 15px;
          color: #42b983;
          margin-left: 10px;
          margin-top: 18px;
        }
        .title {
          width: 170px;
          height: 50px;
          color: #42b983;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          line-height: 50px;
          margin-left: 10px;
        }
        .editMenu {
          width: 55px;
          display: flex;
          justify-content: space-around;
          padding-top: 18px;
          .iconfont {
            font-size: 15px;
            color: #42b983;
          }
        }
      }
    }
    .chatUserInfo {
      height: 60px;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      .chatUserInfoLeft {
        display: flex;
        justify-content: flex-start;
        .chatUserInfoImg {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .chatUserInfoDesc {
          width: 180px;
          padding-left: 10px;
          height: 60px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          .chatUserInfoName {
            line-height: 16px;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;
          }
          .chatUserInfoIntro {
            line-height: 12px;
            color: #fff;
            font-size: 12px;
            padding-top: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;
          }
        }
      }
      .chatUserInfoRight {
        width: 20px;
        height: 20px;
        line-height: 20px;
        padding-top: 30px;
        .iconfont {
          font-size: 20px;
          color: #fff;
          cursor: pointer;
          &:hover {
            color: #42b983;
          }
        }
      }
    }
  }
  .chatCon {
    width: calc(100vw - 300px);
    height: 100%;
    padding-left: 300px;
    height: 100vh;
    position: relative;
    .chatMessageSend {
      position: absolute;
      padding-left: 300px;
      width: calc(100vw - 300px);
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      height: 60px;
      border-top: 1px solid #48484e;
      .iconBtn {
        height: 60px;
        width: 40px;
        margin: 0 10px;
        line-height: 60px;
        cursor: pointer;
        .iconfont {
          font-size: 25px;
          color: #fff;
          &:hover {
            color: #42b983;
          }
        }
      }
      .sendMessage {
        width: calc(80% - 320px);
        height: 60px;
        margin-left: 10px;
        .sendMessageText {
          width: 100%;
          height: 40px;
          padding: 10px 0;
          textarea {
            height: 100%;
            width: 90%;
            outline: none;
            resize: none;
            line-height: 40px;
            font-size: 14px;
            color: #333;
            border: none;
            padding-left: 10px;
            &::placeholder {
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
      .sendBtn {
        width: 100px;
        background: #42b983;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-radius: 10px;
        margin-top: 10px;
        cursor: pointer;
      }
    }
    .chatMessageList {
      padding: 20px;
      height: calc(100vh - 100px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 6px;
        border: 1px solid transparent;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #42b983;
        border-radius: 3px;
      }
      .messageItem {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 40px;
        &.right {
          flex-direction: row-reverse;
          .messageDetail {
            margin-left: 0;
            margin-right: 10px;
            text-align: right;
            .date {
              text-align: right;
            }
          }
        }
        .messageItemAvtar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #ccc;
          overflow: hidden;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .messageDetail {
          margin-left: 10px;
          width: calc(90% - 40px);
          text-align: left;
          .date {
            font-size: 16px;
            line-height: 30px;
            color: #fff;
            text-align: left;
          }
          .messageDetailText {
            display: inline-block;
            padding: 5px 10px;
            background: #1e1e20;
            border-radius: 10px;
            text-align: left;
            font-size: 16px;
            color: #fff;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
