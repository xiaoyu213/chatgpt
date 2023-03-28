<template>
  <div>
    <h1>
      testSSE:
      <button @click="close">关闭</button>
    </h1>
    <h2>默认事件Message返回值：{{message}}</h2>
    <pre>
      {{customEvents}}
    </pre>
  </div>
</template>

<script>
import {EventStreamContentType, fetchEventSource} from '@microsoft/fetch-event-source';
class RetriableError extends Error { }
class FatalError extends Error { }
export default {
  data() {
    return {
      message: null, //message返回值
      customEvents: null, //customEvents返回值
      source: null, //SSE实例
    };
  },
  beforeMount() {
    this.otherInit();
  },
  methods: {
    close() {
      //浏览器关闭SSE连接
      this.source.close();
    },
    otherInit(){
      // const ctrl = new AbortController();
      // fetchEventSource('http://localhost:3000/chatNew', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": 'application/json',
      //   },
      //   body: JSON.stringify([
      //     {
      //       role:"user",
      //       content:"怎么学习国家公务员考试"
      //     }
      //   ]),
      //   signal: ctrl.signal,
      //   onmessage(event) {
      //     console.info(event.data);
      //   },
      //   onerror(error) {
      //     console.log(error)
      //     // that.source = null
      //   }
      // })
      fetchEventSource('/api/sse', {
        async onopen(response) {
          if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
            return;
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage(msg) {
          // if the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (msg.event === 'FatalError') {
            throw new FatalError(msg.data);
          }
        },
        onclose() {
          // if the server closes the connection unexpectedly, retry:
          throw new RetriableError();
        },
        onerror(err) {
          if (err instanceof FatalError) {
            throw err; // rethrow to stop the operation
          } else {
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        }
      });
    },
    init() {
      // const data = {
      //   "model":"text-davinci-003",
      //   "content": "请问国家公务员考试应该怎么准备"
      // }
      // console.log(data)
      //初始化SSE事件，url为当前同源目录
      const source = new EventSource('http://localhost:3000/chat?message="怎么学习国家公务员考试"');

      source.addEventListener('open', () => {
        console.log('建立连接');
      });

      source.addEventListener('error', (err) => {
        console.log('连接出错:', err);
        source.close();
      });

      source.addEventListener('message', (event) => {
        // 结束则关闭链接
        console.log(event)
        const data = event.data ? event.data : '/n'
        if(data == '[DONE]'){
          source.close()
        }else{
          this.customEvents += data
        }
      });
    },
  },
};
</script>
