<template>
    <div class="preview">
        <div class="cover"></div>
        <div class="content-area">
            <div class="close" @click="handleClose">
                <i class="el-icon el-icon-close"></i>
            </div>
            <template
                v-if="status == 'html'"
            >
                <div ref="htmlBox" class="html-box"></div>
            </template>
            <template
                v-if="status != 'html'"
            >
                <iframe :src="fileUrl" frameborder="0"></iframe>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PreView',
        props: {
            status: String,
            fileUrl: String
        },
        data() {
            return {}
        },
        mounted() {
            if(this.status == 'html') {
                this.$refs.htmlBox.innerHTML = this.fileUrl;
            }
        },
        methods: {
            handleClose() {
                console.log(this.$preView);
                this.$preView.hide();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .preview {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000000;

        .cover {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgb(0, 0, 0, .7);
        }

        .content-area {
            position: absolute;
            left: 50%;
            top: 60px;
            transform: translate(-50%, 0);
            width: 600px;
            height: 800px;
            border: 1px solid red;
            box-sizing: border-box;

            .html-box {
                width: 100%;
                background-color: #fff;
            }
            
            iframe {
                width: 100%;
                height: 100%;
            }

            .close {
                position: absolute;
                right: 0;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 24px;
                z-index: 1000001;
            }
        }
    }
</style>