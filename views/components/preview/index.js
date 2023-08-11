import _PreView from './index.vue';

//  导出插件
export default {
    install(Vue) {
        //  创建全局组件
        Vue.component(_PreView.name, _PreView);

        let preView = null; //  接收

        //  将方法挂载到全局
        Vue.prototype.$preView = {
            show,
            hide
        };

        //  创建两个方法，用来操作组件
        function show(props) {
            //  渲染组件
            if(!preView) {  //  第一次, 创建一个新的  
                const PreView = Vue.extend({
                    render: h => h('pre-view', {props})
                }); 

                preView = new PreView();
                this.vm = preView.$mount(); //  转换成真实的dom
                document.body.appendChild(this.vm.$el);
            }
        }

        function hide() {
            document.body.removeChild(this.vm.$el);
            preView.$destroy(); //销毁

            preView = null;
            this.vm = null;
        }

    }
}