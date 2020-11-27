<template>
	<div>
		<h2>生成修复SQL语句</h2>
		<div class="grid-content bg-purple">

		</div>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<h2>1. 需要首先查询公司环境的表单信息表，并且导入到软件：</h2>
					<h4>select * from forminfo;</h4>
					<h2>公司表单</h2>
					<input type="file" @click="uploadFile" style="display: none" ref="fileUpload" accesskey="json" @change="tirggerFile($event)">
					<el-button type="primary" size="mini"  @click="triggerFileUpload">点击上传formInfo表导出的json文件</el-button>
					<el-button type="primary" size="mini"  @click="readFile">读取文件内容</el-button>
					<br>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<h2>1. 需要首先查询公司环境的表单信息表，并且导入到软件：</h2>
					<h4>select * from forminfo;</h4>
					<h2>公司表单</h2>
					<input type="file" @click="uploadFile" style="display: none" ref="fileUpload" accesskey="json" @change="tirggerFile($event)">
					<el-button type="primary" size="mini"  @click="triggerFileUpload">点击上传formInfo表导出的json文件</el-button>
					<el-button type="primary" size="mini"  @click="readFile">读取文件内容</el-button>
					<br>
				</div>
			</el-col>
		</el-row>
		<!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
		<el-table :data="formList" style="width: 100%">
			<el-table-column prop="RID" label="公司表单-RID"/>
			<el-table-column prop="EXCHANGEID" label="公司表单-EXCHANGEID"/>
			<el-table-column prop="TITLE" label="公司表单-TITLE"/>
			<el-table-column prop="RID" label="现场表单-RID"/>
			<el-table-column prop="EXCHANGEID" label="现场表单-EXCHANGEID"/>
			<el-table-column prop="TITLE" label="现场表单-TITLE"/>
		</el-table>
	</div>
</template>

<script>
import { readFile } from '../../utils/ipcUtil'
import { extraExcel } from '../../utils/ipcUtil'

export default {
	name: 'fixForm',
	data() {
		return {
			fileList: [],
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			formList:[]
		}
	},
	computed: {

	},
	watch: {
	},
	methods: {
		tirggerFile(event){
			var files = event.target.files
			this.fileList = files;
		},
		readFile(){
			alert("开始读取文件" + this.$refs.fileUpload.files[0].path);
			var readBuffer = readFile(this.$refs.fileUpload.files[0].path)
			var formList = JSON.parse(readBuffer);
			this.formList = formList;
			console.log(formList)
		},
		extraExcel(){
			alert("开始读取文件" + this.$refs.fileUpload.files[0].path);
			var readBuffer = extraExcel(this.$refs.fileUpload.files[0].path)
			var formList = JSON.parse(readBuffer);
			this.formList = formList;
			console.log(formList)
		},
		onSubmit() {
			console.log('submit!')
		},
		uploadFile() {
			// 先清理，再上传
			this.$refs.fileUpload.value = ''
			this.$refs.fileUpload.click();
		},
		triggerFileUpload() {
			this.uploadFile()
		}
	}
}

</script>

<style scoped>
</style>
