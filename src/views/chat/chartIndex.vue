<template>
  <div class="chatPage">
    <div class="sildeLeft">
      <div class="chatHistoryList">
        <div class="chatHistoryItem">
          <i class="iconfont icon-jichuxinxiguanli"></i>
          <div class="title">聊天历史记录聊天历史记录1</div>
          <div class="editMenu">
            <i class="iconfont icon-bianji"></i>
            <i class="iconfont icon-shanchu"></i>
          </div>
        </div>
        <div class="chatHistoryItem">
          <i class="iconfont icon-jichuxinxiguanli"></i>
          <div class="title">聊天历史记录聊天历史记录1</div>
          <div class="editMenu">
            <i class="iconfont icon-bianji"></i>
            <i class="iconfont icon-shanchu"></i>
          </div>
        </div>
        <div class="chatHistoryItem">
          <i class="iconfont icon-jichuxinxiguanli"></i>
          <div class="title">聊天历史记录聊天历史记录1</div>
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
        <div class="messageItem right">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">请问你怎么看</div>
          </div>
        </div>
        <div class="messageItem left">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">
              {{ VueMarkdownData }}
              <!--              <v-md-preview :text="VueMarkdownData"></v-md-preview>-->
            </div>
          </div>
        </div>
        <div class="messageItem right">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">请问你怎么看</div>
          </div>
        </div>
        <div class="messageItem left">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">
              {{ VueMarkdownData }}
              <!--              <v-md-preview :text="VueMarkdownData"></v-md-preview>-->
            </div>
          </div>
        </div>
        <div class="messageItem right">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">请问你怎么看</div>
          </div>
        </div>
        <div class="messageItem left">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">
              {{ VueMarkdownData }}
              <!--              <v-md-preview :text="VueMarkdownData"></v-md-preview>-->
            </div>
          </div>
        </div>
        <div class="messageItem right">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">请问你怎么看</div>
          </div>
        </div>
        <div class="messageItem left">
          <div class="messageItemAvtar">
            <img
              src="https://foruda.gitee.com/avatar/1676969986653436463/1460456_xiaoyu213_1618720174.png!avatar200"
            />
          </div>
          <div class="messageDetail">
            <div class="date">2023/3/29 13:56:26</div>
            <div class="messageDetailText">
              {{ VueMarkdownData }}
              <!--              <v-md-preview :text="VueMarkdownData"></v-md-preview>-->
            </div>
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
        <div class="sendBtn">
          <i class="iconfont icon-fasong"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
export default {
  name: "chartIndex",
  components: {
    // VMdPreview, // 注入组件
  },
  data() {
    return {
      VueMarkdownData:
        "您可以使用 `xlsx` 包中提供的 `writeFile` 方法并设置密码选项来创建一个需要密码才能打开的 Excel 文件。\\n\\n以下是一个简单的示例代码：\\n\\n```javascript\\nconst XLSX = require('xlsx');\\nconst workbook = XLSX.utils.book_new();\\n\\n// 创建工作表数据\\nconst data = [['Hello', 'World'], ['OpenAI', 'is', 'awesome']];\\n\\n// 创建工作簿和工作表\\nconst worksheet = XLSX.utils.aoa_to_sheet(data);\\nXLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');\\n\\n// 将工作簿写入文件，其中 password 参数将设置密码保护。\\nXLSX.writeFile(workbook, 'my_excel_file.xlsx', { bookType: 'xlsx', password: 'mypassword' });\\n```\\n\\n在这个例子中，我们首先创建了一个工作表数据，并将其转换为工作表对象。我们然后将工作表添加到新创建的工作簿中，然后使用 `writeFile` 方法将工作簿写入名为 `my_excel_file.xlsx` 的文件。通过将 `password` 选项设置为所需的密码，我们可以使生成的 Excel 文件受到保护，只有在输入正确的密码时才能打开。\\n\\n请注意，使用密码保护的 Excel 文件可能不兼容某些软件或版本，您应该在使用此功能之前进行测试并确保它符合您的需求。\"\n",
    };
  },
  beforeMount() {
    // this.otherInit();
  },
  methods: {},
};
</script>
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
