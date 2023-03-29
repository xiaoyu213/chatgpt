<template>
  <div class="homePage">
    <div class="homeLogo">
      <i class="iconfont icon-a-open-ai-seeklogocom"></i>
    </div>
    <div class="homeTitle">欢迎来到YULEI·AI网站</div>
    <div class="homeCon">
      <div class="modelList">
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-bianji"></i>文本生成
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-jichuxinxiguanli"></i>语言翻译
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-SQLpeizhi"></i>问题回答
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-rizhishenji"></i>文字纠错
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-zuzhiguanli"></i>对话机器人
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-zhedie"></i>自然语言处理
            <div class="line"><span></span></div>
          </div>
        </div>
        <div class="modelItem">
          <div class="modeLine">
            <i class="iconfont icon-xitongrizhi"></i>代码生成
            <div class="line"><span></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.homePage {
  width: 100%;
  min-height: 100vh;
  background: #101014;
  display: flex;
  justify-content: center;
  flex-direction: column;
  perspective: 500px; /* 设置透视距离 */
  overflow: hidden;
  &:hover {
    .homeLogo {
      transform-style: preserve-3d; /* 设置为 3D 环境 */
      transform: translateZ(10px); /* 在 Z 轴上平移 */
    }
    .homeTitle {
      transform-style: preserve-3d; /* 设置为 3D 环境 */
      transform: translateZ(10px); /* 在 Z 轴上平移 */
    }
    .homeCon {
      transform-style: preserve-3d; /* 设置为 3D 环境 */
      transform: translateZ(10px); /* 在 Z 轴上平移 */
    }
  }
  .homeLogo {
    font-size: 50px;
    margin-bottom: 20px;
    transform: translate(0px, -60px) rotateX(20deg) rotateZ(-20deg);
    transition: all 1s;
    .iconfont {
      font-size: 60px;
      color: #fff;
    }
  }
  .homeTitle {
    font-size: 50px;
    color: #fff;
    text-align: center;
    font-family: "myFont";
    transform: translate(0px, -60px) rotateX(20deg) rotateZ(-20deg);
    transition: all 1s;
  }
  .homeCon {
    width: 1000px;
    margin: 100px auto 0;
    border: 1px solid #fff;
    border-radius: 20px;
    background: #252525;
    box-shadow: -2px 2px 0px 0px #202020, -10px 10px 40px 0px rgba(0, 0, 0, 0.3);
    transform: translate(0px, -160px) rotateX(20deg) rotateZ(-20deg);
    z-index: 2;
    transition: all 1s;
    .modelList {
      width: 70%;
      padding: 30px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0 auto;
      .modelItem {
        width: 50%;
        height: 120px;
        line-height: 100px;
        text-align: left;
        font-size: 30px;
        color: #fff;
        font-family: "myFont";
        cursor: pointer;
        &:hover {
          .line span {
            width: 100%;
          }
        }
        .iconfont {
          font-size: 30px;
          margin-right: 20px;
        }
        .modeLine {
          display: inline-block;
          position: relative;
        }
        .line {
          width: 100%;
          height: 2px;
          position: absolute;
          left: 0;
          bottom: 0;
          span {
            display: block;
            width: 0;
            height: 2px;
            background: #fff;
            border-radius: 1px;
            transition: all 0.5s;
          }
        }
      }
    }
  }
}
</style>
