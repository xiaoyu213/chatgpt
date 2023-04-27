<template>
  <div
    class="chatPage"
    :class="{
      hideSildeLeft: !isPhone && !isShowLeft,
      isPhone: isPhone,
      phoneMenu: phoneMenu,
    }"
  >
    <div class="homeTop">
      <div class="homeTopLeft" @click="showLeftMenu">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="homeTopMiddle">{{ historyListIdInfo.name }}</div>
      <div class="homeTopRight">
        <div class="iconBtn deleteBtn" @click="deleteChatTitle">
          <i class="iconfont icon-shanchu"></i>
        </div>
        <div class="iconBtn saveBtn" @click="saveChat">
          <i class="iconfont icon-daochu"></i>
        </div>
        <div class="iconBtn triggerBtn">
          <i class="iconfont icon-zaixianyonghu"></i>
        </div>
        <div
          class="iconBtn triggerBtn"
          disabled="isAnswer"
          @click="stopAllAnswer"
        >
          <i class="iconfont icon-tingzhi"></i>
        </div>
      </div>
    </div>
    <div class="sildeLeftCover" @click.prevent="hideLeftSilde"></div>
    <div class="sildeLeft">
      <div class="chatHistoryList">
        <div class="chatHistoryListAdd">
          <div
            class="chatHistoryItem"
            v-for="item in historyList"
            :key="item.time"
            :class="{ active: historyListId == item.id }"
            @click="changeChatID(item)"
          >
            <i class="iconfont icon-jichuxinxiguanli"></i>
            <div class="title">{{ item.name }}</div>
            <div class="editMenu" v-if="historyListId == item.id">
              <i class="iconfont icon-bianji" @click="editChatTitle(item)"></i>
              <i
                class="iconfont icon-shanchu"
                @click="deleteChatTitle(item)"
              ></i>
            </div>
          </div>
        </div>
        <div class="chatHistoryItem new" @click="addNewChat">
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
      <div class="drawWrap" @click="showOrHideSild">
        <i class="iconfont icon-xiangyou3fill"></i>
      </div>
    </div>
    <div class="chatCon" ref="chat">
      <div class="chatMessageList">
        <el-scrollbar :height="initHeight" ref="scrollbarRef" id="chatListWrap">
          <div
            class="messageItem"
            v-for="(item, index) in messageList"
            :class="[item.role == 'user' ? 'right' : 'left']"
            :key="index"
          >
            <div class="messageItemAvtar">
              <img
                v-if="item.role == 'user'"
                src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
              />
              <img v-else src="./../../assets/ChatGPTnycase.png" />
            </div>
            <div class="messageDetail">
              <div class="date">{{ item.timeStr }}</div>
              <div class="messageDetailText" :id="'messageItem_' + index">
                <div
                  class="messageDetailTextDetail"
                  v-html="item.contentHtml"
                ></div>
              </div>
              <div class="status" v-if="item.role != 'user'">
                <div class="statusItem">
                  {{ item.status ? "回答已完成" : "正在回答中" }}
                </div>
                <div
                  class="statusItem copyItem"
                  v-if="item.status"
                  @click.prevent="copyAllAnswer(index)"
                >
                  复制答案
                </div>
                <div
                  class="statusItem"
                  v-if="item.status"
                  @click.prevent="downloadAllAnswer(index)"
                >
                  保存为图片
                </div>
              </div>
            </div>
          </div>
          <div class="messageItem lastMessageItem" ref="lastMessageItem"></div>
        </el-scrollbar>
      </div>
      <div class="chatMessageSend" ref="chatMessageSend">
        <div class="iconBtn deleteBtn">
          <i class="iconfont icon-shanchu" @click="deleteChatTitle"></i>
        </div>
        <div class="iconBtn saveBtn" @click="saveChat">
          <i class="iconfont icon-daochu"></i>
        </div>
        <div class="iconBtn triggerBtn">
          <i class="iconfont icon-zaixianyonghu"></i>
        </div>
        <div
          class="iconBtn triggerBtn"
          disabled="isAnswer"
          @click="stopAllAnswer"
        >
          <i class="iconfont icon-tingzhi"></i>
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
              @keydown="sendMessageKey"
            />
          </div>
        </div>
        <div class="sendBtn" @click="sendMessage">
          <i class="iconfont icon-fasong"></i>
        </div>
      </div>
    </div>
    <div class="saveMessageListWrap" v-if="saveMessageListWrap">
      <div class="saveMessageCon">
        <div class="chatMessageList" id="saveChatMessageList">
          <div
            class="messageItem left"
            v-for="(item, index) in saveMessageList"
            :key="index"
          >
            <div class="messageItemAvtar">
              <img src="./../../assets/1460456_xiaoyu213_1618720174.png" />
            </div>
            <div class="messageDetail">
              <div class="date">{{ item.timeStr }}</div>
              <div class="messageDetailText" v-html="item.contentHtml"></div>
              <div class="status" v-if="item.role != 'user'">
                <div class="statusItem">
                  {{ item.status ? "回答已完成" : "正在回答中" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      title="修改聊天标题"
      width="400"
      center
    >
      <el-input
        v-model="changeName"
        placeholder="请输入名称"
        :prefix-icon="ChatLineRound"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changeChatName">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="passwordDialogVisible"
      title="请输入密钥进行验证"
      width="400"
      center
    >
      <el-input
        v-model="changePassword"
        placeholder="请输入密钥"
        :prefix-icon="ChatLineRound"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changeChatPassword"
            >确认验证</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { chatDB, chatDetailDB, chatIndex } from "@/service/chat";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css";
import "highlight.js/styles/github-dark.css";
import { parseTime } from "@/utils/date";
import Clipboard from "clipboard";
import html2canvas from "html2canvas";
import getSign from "@/utils/sign";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MD5 = require("crypto-js/md5");
export default {
  name: "chartIndex",
  data() {
    return {
      sendMessageText: "",
      messageList: [],
      historyList: [],
      historyListId: 0,
      historyListIndex: 0,
      historyListIdInfo: {},
      initHeight: 0,
      scrollbar: null,
      saveMessageListWrap: false,
      isShowLeft: true,
      isPhone: false,
      phoneMenu: false,
      centerDialogVisible: false,
      changeName: "",
      saveMessageList: [],
      passwordDialogVisible: false,
      changePassword: "",
      isAnswer: false,
      abortController: null,
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
      this.watchWindowSize();
      const topHeight = this.isPhone ? 50 : 0;
      if (this.$refs.chat && this.$refs.chatMessageSend) {
        this.initHeight =
          this.$refs.chat.offsetHeight -
          this.$refs.chatMessageSend.offsetHeight -
          20 -
          topHeight;
      }
      this.scrollbar = this.$refs.scrollbarRef;
      this.scrollDown();
      window.addEventListener("resize", this.resizeInit);
    });
    this.getListMenu();
  },
  methods: {
    async addNewChat() {
      this.addListMenu("新聊天");
    },
    async changeChatID(item) {
      await chatIndex.updateData({
        id: "chatIndex",
        value: item.id,
      });
      this.historyListId = item.id;
      this.getMessage(this.historyListId);
    },
    editChatTitle() {
      this.centerDialogVisible = true;
    },
    changeChatName() {
      if (!this.changeName) {
        ElMessage({
          type: "info",
          message: "请输入要修改的名称",
        });
        return;
      }
      this.upDateMessageTitle(this.changeName);
      this.centerDialogVisible = false;
      this.changeName = "";
    },
    deleteChatTitle(item) {
      ElMessageBox.confirm("请问真的要删除这个聊天记录么", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.removeNowChat();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    },
    async removeNowChat() {
      await chatDB.deleteDataById(this.historyListId);
      await chatDetailDB.deleteDataByChatIds(this.historyListId);
      this.historyListId = null;
      ElMessage({
        type: "success",
        message: "删除成功！",
      });
      this.getListMenu();
    },
    async addListMenu(name) {
      try {
        const createId = new Date().getTime();
        const res = await chatDB.addData({
          id: createId,
          name: name,
        });
        if (res) {
          await chatIndex.updateData({
            id: "chatIndex",
            value: createId,
          });
          this.getListMenu();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async upDateMessageTitle(name) {
      const historyListIdInfo = JSON.parse(
        JSON.stringify(this.historyListIdInfo)
      );
      historyListIdInfo.name = name;
      await chatDB.updateData(historyListIdInfo);
      this.historyList[this.historyListIndex] = historyListIdInfo;
      this.historyListIdInfo = historyListIdInfo;
    },
    async getListMenu() {
      try {
        const res = await chatDB.queryList();
        if (res.length <= 0) {
          this.addListMenu("新聊天");
        } else {
          res.sort(function (a, b) {
            return b.id - a.id;
          });
          this.historyList = res;
          this.initHistoryIndex();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addMessage(chatId, json, isAnswer) {
      try {
        if (json.role == "assistant") {
          const parentsInfo = this.messageList[isAnswer - 1];
          parentsInfo.status = true;
          await chatDetailDB.updateData({ ...parentsInfo });
          json.id = new Date().getTime();
        }
        await chatDetailDB.addData({
          chatId,
          ...json,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    async getMessage(chatId) {
      try {
        const messageList = await chatDetailDB.queryList({ chatId });
        this.messageList = messageList;
        setTimeout(() => {
          this.initCopyBtn();
          this.scrollDown();
        }, 1000);
      } catch (error) {
        throw new Error(error);
      }
    },
    async initHistoryIndex() {
      const res = await chatIndex.getDataById("chatIndex");
      if (res) {
        let historyListId = null;
        let historyListIdInfo = null;
        let historyListIndex = 0;
        this.historyList.forEach((item, index) => {
          if (item.id == res.value) {
            historyListId = item.id;
            historyListIdInfo = item;
            historyListIndex = index;
          }
        });
        if (!historyListId) {
          this.historyListId = this.historyList[0].id;
          this.historyListIdInfo = this.historyList[0];
          this.historyListIndex = 0;
          await chatIndex.updateData({
            id: "chatIndex",
            value: this.historyListId,
          });
        } else {
          this.historyListId = historyListId;
          this.historyListIdInfo = historyListIdInfo;
          this.historyListIndex = historyListIndex;
        }
      } else {
        this.historyListId = this.historyList[0].id;
        this.historyListIdInfo = this.historyList[0];
        this.historyListIndex = 0;
        await chatIndex.addData({
          id: "chatIndex",
          value: this.historyListId,
        });
      }
      this.getMessage(this.historyListId);
    },
    showLeftMenu() {
      this.phoneMenu = !this.phoneMenu;
    },
    hideLeftSilde() {
      this.phoneMenu = false;
    },
    showOrHideSild() {
      this.isShowLeft = !this.isShowLeft;
    },
    sendMessageKey(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        // 判断是否按下了ctrl和enter键
        this.sendMessage();
      }
    },
    changeChatPassword() {
      if (!this.changePassword) {
        ElMessage({
          message: "请先填写服务密钥",
          type: "warning",
        });
        return;
      }
      if (
        MD5(this.changePassword).toString().toUpperCase() ==
        MD5("xiaoyuopenai").toString().toUpperCase()
      ) {
        localStorage.setItem(
          "password",
          MD5("xiaoyuopenai").toString().toUpperCase()
        );
        this.sendMessage();
        this.passwordDialogVisible = false;
      } else {
        ElMessage({
          message: "验证失败",
          type: "warning",
        });
        return;
      }
    },
    sendMessage() {
      if (
        localStorage.getItem("password") !=
        MD5("xiaoyuopenai").toString().toUpperCase()
      ) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "请先填写服务密钥",
          type: "warning",
        });
        this.passwordDialogVisible = true;
        return;
      }
      if (this.isAnswer) {
        ElMessage({
          message: "等待回答完成",
          type: "warning",
        });
        return;
      }
      if (!this.sendMessageText) {
        // eslint-disable-next-line no-undef
        ElMessage({
          message: "请先填写内容",
          type: "warning",
        });
        return;
      }
      const qusId = new Date().getTime();
      const pushData = {
        role: "user",
        content: this.sendMessageText,
        contentHtml: marked.parse(this.sendMessageText),
        timeStr: parseTime(new Date()),
        id: qusId,
        status: false,
        chatId: this.historyListId,
      };
      this.addMessage(this.historyListId, pushData);
      if (this.messageList.length == 0) {
        pushData.content += "（如果回答中有代码，请以markdown形式返回）";
        this.upDateMessageTitle(this.sendMessageText.substring(0, 20));
      }
      const answerData = {
        role: "assistant",
        content: "正在回答中...",
        contentHtml: "正在回答中...",
        timeStr: parseTime(new Date()),
        status: false,
        parentId: qusId,
        chatId: this.historyListId,
      };
      this.messageList.push(pushData);
      this.messageList.push(answerData);
      this.getAnswer();
      this.scrollDown();
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

          // 创建“保存为图片”按钮元素
          const downloadBtn = document.createElement("span");
          downloadBtn.className = "download-btn";
          downloadBtn.textContent = "保存为图片";

          const div = document.createElement("div");
          div.className = "code-block";
          block.parentNode.insertBefore(div, block);

          const newDiv = document.createElement("div");
          newDiv.className = "menu-block";
          const span1 = document.createElement("span");
          const span2 = document.createElement("span");
          const span3 = document.createElement("span");
          newDiv.appendChild(span1);
          newDiv.appendChild(span2);
          newDiv.appendChild(span3);
          div.appendChild(downloadBtn);
          div.appendChild(copyBtn);
          div.appendChild(languageTypeSpanNew);
          div.appendChild(block);
          div.appendChild(newDiv);
          copyBtn.addEventListener("click", (e) => {
            const text = block.innerText;
            const clipboard = new Clipboard(e.target, { text: () => text });
            clipboard.on("success", (e) => {
              ElMessage.success("复制成功");
              // 释放内存
              clipboard.off("error");
              clipboard.off("success");
              clipboard.destroy();
            });
            clipboard.on("error", (e) => {
              // 释放内存
              ElMessage.success("复制失败");
              clipboard.off("error");
              clipboard.off("success");
              clipboard.destroy();
            });
            clipboard.onClick(e);
          });
          downloadBtn.addEventListener("click", (e) => {
            this.creatImg(div);
          });
        }
      });
      this.scrollDown();
    },
    copyAllAnswer(index) {
      const text = this.messageList[index].content;
      const clipboard = new Clipboard(event.target, { text: () => text });
      clipboard.on("success", (e) => {
        ElMessage.success("复制成功");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 释放内存
        ElMessage.success("复制失败");
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      // eslint-disable-next-line no-undef
      clipboard.onClick(event);
    },
    saveChat() {
      this.saveMessageListWrap = true;
      this.saveMessageList = this.messageList;
      this.$nextTick(() => {
        const nowDom = document.getElementById(`saveChatMessageList`);
        this.creatImg(nowDom, () => {
          this.saveMessageListWrap = false;
        });
      });
    },
    downloadAllAnswer(index) {
      this.saveMessageListWrap = true;
      this.saveMessageList = [
        this.messageList[index - 1],
        this.messageList[index],
      ];
      this.$nextTick(() => {
        const nowDom = document.getElementById(`saveChatMessageList`);
        this.creatImg(nowDom, () => {
          this.saveMessageListWrap = false;
        });
      });
    },
    resizeInit() {
      this.$nextTick(() => {
        const topHeight = this.isPhone ? 50 : 0;
        if (this.$refs.chat && this.$refs.chatMessageSend) {
          this.initHeight =
            this.$refs.chat.offsetHeight -
            this.$refs.chatMessageSend.offsetHeight -
            20 -
            topHeight;
        }
        this.scrollDown();
        this.watchWindowSize();
      });
    },
    watchWindowSize() {
      const windowWidth = document.documentElement.clientWidth;
      if (windowWidth >= 1000) {
        this.isPhone = false;
        this.isShowLeft = true;
      } else if (windowWidth < 1000 && windowWidth > 600) {
        this.isPhone = false;
        this.isShowLeft = false;
      } else {
        this.isPhone = true;
        this.isShowLeft = false;
      }
    },
    async getAnswer() {
      this.isAnswer = true;
      this.abortController = new AbortController();
      const pushList = JSON.parse(
        JSON.stringify(this.messageList.slice(0, this.messageList.length - 1))
      );
      pushList.forEach((item) => {
        delete item["contentHtml"];
        delete item["timeStr"];
        delete item["status"];
        delete item["chatId"];
        delete item["id"];
        delete item["parentId"];
      });
      const lastPushList = pushList.slice(
        pushList.length - 5 > 0 ? pushList.length - 5 : 0,
        pushList.length
      );
      const upIndex = this.messageList.length - 1;
      try {
        //http://82.156.167.136/chatNew
        //https://api.sxfenbi.com/chatNew
        const nowTime = new Date().getTime();
        const response = await fetch("https://api.sxfenbi.com/chatNew", {
          signal: this.abortController.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            key: nowTime,
            sign: getSign(nowTime),
          },
          body: JSON.stringify(lastPushList),
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
              this.finishAnser(upIndex);
              flag = false;
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
                this.finishAnser(upIndex);
                flag = false;
                break;
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
            this.finishAnser(upIndex);
            break;
          }
        }
      } catch (error) {
        this.finishAnser(upIndex);
      }
    },
    stopAllAnswer() {
      if (!this.isAnswer) return;
      const index = this.messageList.length - 1;
      this.finishAnser(index);
    },
    finishAnser(upIndex) {
      this.messageList[upIndex].status = true;
      this.addMessage(this.historyListId, this.messageList[upIndex], upIndex);
      this.isAnswer = false;
      this.abortController.abort();
      this.initCopyBtn();
    },
    // 生成图片
    creatImg(domRef, fn) {
      const setup = {
        useCORS: true, // 使用跨域
      };
      html2canvas(domRef, setup).then((canvas) => {
        const link = canvas.toDataURL("image/jpg");
        this.exportPicture(link, "文件名", fn);
      });
    },
    // 导出图片
    exportPicture(link, name = "未命名文件", fn) {
      const file = document.createElement("a");
      file.style.display = "none";
      file.href = link;
      file.download = decodeURI(name);
      document.body.appendChild(file);
      file.click();
      document.body.removeChild(file);
      fn && fn();
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", () => {
      console.log("leave");
    });
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
.isPhone {
  .code-block {
    pre {
      code {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        display: block;
        overflow-x: auto;
      }
    }
  }
}
.code-block {
  position: relative;
  min-width: 200px;
  margin-top: 10px;
  pre {
    min-width: 200px;
    background: #0d1117;
    padding-top: 30px;
    box-sizing: border-box;
    code {
      padding: 1em;
      width: 100%;
      display: block;
      box-sizing: border-box;
      &.hljs {
        padding-top: calc(20px + 1em) !important;
      }
    }
  }
  .menu-block {
    position: absolute !important;
    left: 10px !important;
    top: 10px !important;
    display: flex;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: red;
      margin-right: 10px;
      &:nth-last-of-type(2) {
        background: yellow;
      }
      &:nth-last-of-type(3) {
        background: green;
      }
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
  .download-btn {
    font-size: 12px !important;
    line-height: 12px !important;
    display: inline-block !important;
    position: absolute !important;
    right: 70px !important;
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
    right: 150px !important;
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
  &.hideSildeLeft {
    .sildeLeft {
      transform: translateX(-100%);
      .drawWrap {
        transform: rotate(0);
      }
    }
    .chatCon {
      width: 100vw;
      padding-left: 0;
      .chatMessageSend {
        padding-left: 20px;
        width: calc(100vw - 20px);
      }
    }
  }
  &.isPhone {
    &.phoneMenu {
      .sildeLeft {
        transform: translateX(0);
      }
      .sildeLeftCover {
        display: block;
      }
    }
    .sildeLeft {
      transform: translateX(-100%);
      z-index: 222;
      .drawWrap {
        display: none;
      }
    }
    .homeTop {
      display: flex;
    }
    .chatCon {
      width: 100vw;
      padding-left: 0;
      .chatMessageList {
        padding-top: 60px;
        .messageDetailTextDetail {
          display: block !important;
        }
      }
      .chatMessageSend {
        padding-left: 0px;
        width: 100vw;
        .iconBtn {
          display: none;
        }
        .sendMessage {
          width: calc(100% - 100px);
        }
      }
    }
  }
  .sildeLeftCover {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    display: none;
    z-index: 22;
  }
  .homeTop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    z-index: 12;
    background: #18181c;
    display: none;
    .homeTopLeft {
      width: 60px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      flex-shrink: 0;
      cursor: pointer;
      .iconfont {
        font-size: 30px;
        color: #ffffff;
      }
    }
    .homeTopMiddle {
      width: 100%;
      text-align: left;
      color: #ffffff;
      font-size: 18px;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .homeTopRight {
      width: 160px;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
      .iconBtn {
        width: 40px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        .iconfont {
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
  .sildeLeft {
    width: 300px;
    height: 100vh;
    background: #18181c;
    border-right: 1px solid #48484e;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    transition: all 0.5s;
    .drawWrap {
      position: absolute;
      right: -20px;
      top: 50%;
      margin-top: -20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transform: rotate(180deg);
      transition: all 0.5s;
      .iconfont {
        font-size: 40px;
        color: #f5f5f7;
      }
    }
    .chatHistoryList {
      height: calc(100vh - 100px);
      .chatHistoryListAdd {
        height: calc(100vh - 170px);
        overflow: auto;
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
        &.active {
          .icon-jichuxinxiguanli {
            color: #42b983;
          }
          .title {
            color: #42b983;
          }
          .editMenu {
            .iconfont {
              color: #42b983;
            }
          }
        }
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
          color: #ffffff;
          margin-left: 10px;
          margin-top: 18px;
        }
        .title {
          width: 170px;
          height: 50px;
          color: #ffffff;
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
            color: #ffffff;
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
    background: #101014;
    width: calc(100vw - 300px);
    height: 100%;
    padding-left: 300px;
    height: 100vh;
    position: relative;
    transition: width 0.5s;
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
        width: calc(100% - 260px);
        height: 60px;
        margin-left: 10px;
        background: #101014;
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
            display: block;
            .messageDetailTextDetail {
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
          .status {
            font-size: 14px;
            line-height: 20px;
            color: #d9d9d9;
            padding-left: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: flex-start;
            .statusItem {
              margin-right: 20px;
              line-height: 20px;
              font-size: 14px;
              color: #d9d9d9;
              cursor: pointer;
              &:hover {
                color: #42b983;
              }
            }
          }
        }
      }
    }
  }
}
.saveMessageListWrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  z-index: -1;
  .saveMessageCon {
    width: 1080px;
    height: calc(100vh * 0.9);
    background: #101014;
    margin: 0 auto;
    overflow: hidden;
    .chatMessageList {
      padding: 20px;
      overflow-y: auto;
      background: #101014;
      .messageItem {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 40px;
        .messageItemAvtar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid #cccccc;
          overflow: hidden;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .messageDetail {
          width: 100%;
          margin-left: 10px;
          position: relative;
          top: -5px;
          .date {
            font-size: 16px;
            line-height: 30px;
            color: #ffffff;
            text-align: left;
          }
          .messageDetailText {
            display: block;
            padding: 5px 10px;
            background: #1e1e20;
            border-radius: 10px;
            text-align: left;
            font-size: 16px;
            color: #ffffff;
            line-height: 30px;
          }
          .status {
            font-size: 14px;
            line-height: 20px;
            color: #d9d9d9;
            padding-left: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: flex-start;
            .statusItem {
              margin-right: 20px;
              line-height: 20px;
              font-size: 14px;
              color: #d9d9d9;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
