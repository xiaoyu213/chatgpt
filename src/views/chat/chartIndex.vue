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
    <div class="chatCon" ref="chat">
      <div class="chatMessageList">
        <el-scrollbar :height="initHeight" ref="scrollbarRef">
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
              <div class="messageDetailText" v-html="item.contentHtml"></div>
              <div class="status" v-if="item.role != 'user'">
                {{ item.status ? "回答已完成" : "正在回答中" }}
              </div>
            </div>
          </div>
          <div class="messageItem lastMessageItem" ref="lastMessageItem"></div>
        </el-scrollbar>
      </div>
      <div class="chatMessageSend" ref="chatMessageSend">
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
            <el-input
              v-model="sendMessageText"
              :rows="1"
              :autosize="false"
              type="textarea"
              resize="none"
              placeholder="请输入消息"
            />
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
import "highlight.js/styles/dark.css";
import "highlight.js/styles/github-dark.css";
import { parseTime } from "@/utils/date";
import Clipboard from "clipboard";
export default {
  name: "chartIndex",
  data() {
    return {
      sendMessageText: "",
      messageList: [],
      historyList: [],
      initHeight: 0,
      scrollbar: null,
    };
  },
  async mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "javascript";
        const returnCode = hljs.highlight(code, { language }).value;
        return (
          `<span class="languageType" style="display: none">${lang}</span>` +
          returnCode
        );
      },
      langPrefix: "hljs language-",
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      xhtml: true,
    });
    this.$nextTick(() => {
      this.initHeight =
        this.$refs.chat.offsetHeight -
        this.$refs.chatMessageSend.offsetHeight -
        20;
      this.scrollbar = this.$refs.scrollbarRef;
      this.scrollDown();
      window.addEventListener("resize", this.resizeInit);
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
        contentHtml: marked.parse(this.sendMessageText),
        timeStr: parseTime(new Date()),
      };
      const answerData = {
        role: "assistant",
        content: "正在回答中...",
        contentHtml: "正在回答中...",
        timeStr: parseTime(new Date()),
        status: false,
      };
      this.messageList.push(pushData);
      this.messageList.push(answerData);
      this.getAnswer();
    },
    scrollDown() {
      this.$nextTick(() => {
        this.scrollbar.setScrollTop(
          this.$refs.lastMessageItem.offsetTop +
            this.$refs.lastMessageItem.offsetHeight
        );
      });
    },
    initCopyBtn() {
      // 为所有代码块添加复制代码按钮
      this.$el.querySelectorAll("pre").forEach((block) => {
        const hasCopyBtn = block.querySelector(".code-block") !== null;
        if (!hasCopyBtn) {
          const languageTypeSpan = block.querySelector(".languageType");
          let languageType = null;
          if (languageTypeSpan) {
            languageType = languageTypeSpan.innerHTML;
            languageTypeSpan.remove();
          }
          // 创建“复制”按钮元素
          const copyBtn = document.createElement("span");
          copyBtn.className = "copy-btn";
          copyBtn.textContent = "复制代码";
          const languageTypeSpanNew = document.createElement("span");
          languageTypeSpanNew.className = "languageTypeSpanNew";
          languageTypeSpanNew.textContent = languageType;
          const div = document.createElement("div");
          div.className = "code-block";
          block.parentNode.insertBefore(div, block);
          div.appendChild(copyBtn);
          div.appendChild(languageTypeSpanNew);
          div.appendChild(block);
          copyBtn.addEventListener("click", (e) => {
            const text = block.innerText;
            const clipboard = new Clipboard(e.target, { text: () => text });
            clipboard.on("success", (e) => {
              console.log("复制成功");
              // 释放内存
              clipboard.off("error");
              clipboard.off("success");
              clipboard.destroy();
            });
            clipboard.on("error", (e) => {
              // 释放内存
              clipboard.off("error");
              clipboard.off("success");
              clipboard.destroy();
            });
            clipboard.onClick(e);
          });
        }
      });
    },
    resizeInit() {
      this.$nextTick(() => {
        this.initHeight =
          this.$refs.chat.offsetHeight -
          this.$refs.chatMessageSend.offsetHeight -
          20;
        this.scrollDown();
      });
    },
    async getAnswer() {
      const abortController = new AbortController();
      const pushList = JSON.parse(
        JSON.stringify(this.messageList.slice(0, this.messageList.length - 1))
      );
      pushList.forEach((item) => {
        delete item["contentHtml"];
        delete item["timeStr"];
        delete item["status"];
      });
      const upIndex = this.messageList.length - 1;
      try {
        //http://82.156.167.136/chatNew
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
            if (partialResponse.indexOf("DONE") >= 0) {
              const nowData = this.messageList[upIndex].content;
              this.messageList[upIndex].content =
                nowData + partialResponse.replace("DONE", "");
              this.messageList[upIndex].contentHtml = marked.parse(
                nowData + partialResponse.replace("DONE", "")
              );
              this.messageList[upIndex].status = true;
              console.log(this.messageList[upIndex].content);
              flag = false;
              this.initCopyBtn();
              abortController.abort();
              break;
            } else {
              if (partialResponse == "ERROR") {
                const partialResponseNew = "出现错误";
                const nowData = this.messageList[upIndex].content;
                this.messageList[upIndex].content =
                  nowData + partialResponseNew;
                this.messageList[upIndex].contentHtml = marked.parse(
                  nowData + partialResponseNew
                );
                this.messageList[upIndex].status = true;
              } else {
                const nowData = this.messageList[upIndex].content;
                this.messageList[upIndex].content = nowData + partialResponse;
                this.messageList[upIndex].contentHtml = marked.parse(
                  nowData + partialResponse
                );
              }
            }
          }
          if (done) {
            flag = false;
            this.messageList[upIndex].status = true;
            this.initCopyBtn();
            abortController.abort();
            break;
          }
          this.scrollDown();
        }
      } catch (error) {
        abortController.abort();
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.scrollDown);
  },
};
</script>
<style lang="scss">
.backHtmlWrap {
  white-space: pre-line;
  padding: 30px 0;
  &:deep(p) {
    p {
      white-space: pre-line;
    }
  }
  &:deep(pre) {
    background: #282c34;
    color: #fff;
    position: relative !important;
  }
  &:deep(code) {
    background: #42b983;
    display: inline-block;
    border-radius: 5px;
    padding: 0 5px;
    line-height: 26px;
    white-space: pre-line;
  }
  &:deep(a) {
    color: #42b983;
  }
}
.code-block {
  position: relative;
  pre {
    background: #0d1117;
    border-radius: 10px !important;
    overflow: hidden;
    code {
      padding-top: 30px !important;
    }
  }
  .copy-btn {
    font-size: 12px !important;
    line-height: 12px !important;
    display: inline-block !important;
    position: absolute !important;
    right: 10px !important;
    top: 10px !important;
    color: #fff !important;
    background: none !important;
    outline: none;
    box-shadow: none;
    z-index: 222;
    cursor: pointer;
    &:hover {
      color: #42b983 !important;
    }
  }
  .languageTypeSpanNew {
    font-size: 12px !important;
    line-height: 12px !important;
    display: inline-block !important;
    position: absolute !important;
    right: 100px !important;
    top: 10px !important;
    color: #fff !important;
    background: none !important;
    outline: none;
    box-shadow: none;
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
      padding-left: 320px;
      width: calc(100vw - 320px);
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
        width: calc(100% - 220px);
        height: 60px;
        margin-left: 10px;
        .sendMessageText {
          width: 98%;
          height: 40px;
          padding: 10px 0;
          &:deep(textarea) {
            height: 40px;
            width: 100%;
            outline: none;
            resize: none;
            font-size: 14px;
            line-height: 30px;
            color: #333;
            border: none;
            border-radius: 5px;
            font-family: "myFont";
            &::placeholder {
              font-size: 14px;
              color: #333;
              font-family: "myFont";
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
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
        text-align: center;
        margin-right: 20px;
        .iconfont {
          font-size: 25px;
        }
      }
    }
    .chatMessageList {
      padding: 20px;
      height: calc(100vh - 100px);
      overflow-y: auto;
      .messageItem {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 40px;
        &.lastMessageItem {
          height: 20px;
          margin-bottom: 0px;
        }
        &.right {
          flex-direction: row-reverse;
          .messageDetail {
            margin-left: 0;
            margin-right: 10px;
            text-align: right;
            .date {
              text-align: right;
            }
            .status {
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
          .status {
            font-size: 14px;
            line-height: 20px;
            color: #d9d9d9;
            text-align: left;
            padding-left: 10px;
            padding-top: 5px;
          }
        }
      }
    }
  }
}
</style>
