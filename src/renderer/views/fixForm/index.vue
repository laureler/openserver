<template>
	<div>
		<h2>生成修复SQL语句</h2>
		<el-dialog
			title="提示"
			:visible.sync="centerDialogVisible"
			width="70%"
			center>
			<div>
				<el-button @click="copySQL">复制到剪切板</el-button>
				<h4>{{updateFormSQL()}}</h4>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
		    </span>
		</el-dialog>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<h2>1. 需要首先查询公司环境的表单信息表，并且导入excel</h2>
					<h4>select RID,EXCHANGEID,TITLE from forminfo;</h4>
					<h2>公司表单</h2>
					<input type="file" @click="uploadFile" style="display: none" ref="fileUpload" accesskey="json" @change="tirggerFile($event)">
					<el-button type="primary" size="mini"  @click="triggerFileUpload">点击选择formInfo表导出的excel</el-button>
					<label v-if="fileList.length>0">{{fileList[0].path}}</label>
					<el-button type="primary" size="mini"  @click="readFile">读取文件内容</el-button>
					<br>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<h2>2. 需要首先查询现场环境的表单信息表，并且导入excel</h2>
					<h4>select RID,EXCHANGEID,TITLE from forminfo;</h4>
					<h2>现场表单</h2>
					<input type="file" @click="uploadFile2" style="display: none" ref="fileUpload2" accesskey="json" @change="tirggerFile2($event)">
					<el-button type="primary" size="mini"  @click="triggerFileUpload2">点击选择formInfo表导出的excel</el-button>
					<label v-if="fileList2.length>0">{{fileList2[0].path}}</label>
					<el-button type="primary" size="mini"  @click="extraExcel">读取文件内容</el-button>
					<br>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<br>
				<el-button :disabled="!merged" size="mini" type="primary" @click="selectErrorRids('errorRID')">选择erorrRID状态</el-button>
				<el-button :disabled="!merged" size="mini" type="success" @click="create('errorRID')">根据选中的errorRID状态生成SQL语句</el-button>
			</el-col>
		</el-row>
		<!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
		<el-table ref="multipleTable" :data="formList" style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="TITLE" label="公司表单-TITLE" sortable/>
			<el-table-column prop="TITLE2" label="现场表单-TITLE" sortable/>
			<el-table-column prop="EXCHANGEID" label="公司表单-EXCHANGEID"/>
			<el-table-column prop="EXCHANGEID2" label="现场表单-EXCHANGEID"/>
			<el-table-column prop="RID" label="公司表单-RID" sortable/>
			<el-table-column prop="RID2" label="现场表单-RID" sortable/>
			<el-table-column prop="status" label="匹配结果" sortable/>
		</el-table>
	</div>
</template>

<script>

import { extraExcel,copyText } from '../../utils/ipcUtil'
import { createSQLString } from './sqlUpdate'

export default {
	name: 'fixForm',
	data() {
		return {
			//是否已经合并两种数据
			merged:false,
			centerDialogVisible: false,
			fileList: [],
			fileList2: [],
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
			formList:[],
			formList2:[],
		}
	},
	watch: {
		formList2(newVal,oldVal){
			if(newVal.length>0){
				var mergeFormList1 = this.mergeFormList(this.formList,newVal)
				this.formList = mergeFormList1;
			}else{
				return [];
			}
		}
	},
	computed:{

	},
	methods: {
		copySQL(){
			copyText(this.updateFormSQL());
			alert("复制成功!")
		},
		updateFormSQL(){
			if(this.$refs.multipleTable && this.$refs.multipleTable.selection){
				var selectionDatas = this.$refs.multipleTable.selection;
				var result = "";
				if(selectionDatas.length > 0){
					selectionDatas.map(item=>{
						//公司的id
						var newId = item.RID;
						//现场的id
						var oldId = item.RID2;
						var tempStr = createSQLString(newId,oldId)
						result = result + tempStr;
					})
				}
				return result;
			}else {
				return "";
			}
		},
		create(){
			this.centerDialogVisible = true;
		},
		selectErrorRids(errorCode) {
			if (errorCode) {
				var filteredList = this.formList.filter(item=>{
					return item.status === errorCode
				});
				filteredList.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			}
			else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		tableRowClassName({row, rowIndex}) {
			if (row.status === 'errorRID') {
				return 'error-row';
			} else if (row.status === 'errorTitle') {
				return 'warning-row';
			}else if(row.status === "successRID"){
				return 'success-row';
			}
			return '';
		},

		mergeFormList(formList1, formList2) {

			var formMap2 = new Map()
			formList2.map(item => {
				formMap2.set(item.TITLE2, {
					RID2: item.RID2,
					EXCHANGEID2: item.EXCHANGEID2,
					TITLE2: item.TITLE2
				})
			})

			formList1.map(item => {
				//根据标题匹配表单
				var itemIn2 = formMap2.get(item.TITLE)
				if (itemIn2) {
					if (itemIn2['RID2'] === item['RID']) {
						item['status'] = 'successRID'
					} else {
						item['status'] = 'errorRID'
					}
					item['TITLE2'] = itemIn2['TITLE2']
					item['RID2'] = itemIn2['RID2']
					item['EXCHANGEID2'] = itemIn2['EXCHANGEID2']

					console.log(item)
					formMap2.delete(item.TITLE)
				} else {
					item['status'] = 'errorTitle'
					console.log(item)
				}
			})
			//补全出现不相同标题的功能
			formMap2.forEach((value, key, map) => {
				formList1.push({
					TITLE2: value['TITLE2'],
					RID2: value['RID2'],
					EXCHANGEID2: value['EXCHANGEID2'],
					status: 'errorTitle'
				})
			})
			this.merged = true;
			return formList1
		},

		tirggerFile(event){
			var files = event.target.files
			this.fileList = files;
		},
		tirggerFile2(event){
			var files = event.target.files
			this.fileList2 = files;
		},
		readFile(){
			var array = extraExcel(this.$refs.fileUpload.files[0].path,1);
			this.formList = array;
		},
		extraExcel(){
			if(this.formList.length === 0){
				alert("先导入并读取公司的数据文件")
				return;
			}
			var array = extraExcel(this.$refs.fileUpload2.files[0].path,2);
			this.formList2 = array;
		},
		onSubmit() {
			console.log('submit!')
		},
		uploadFile() {
			// 先清理，再上传
			this.$refs.fileUpload.value = ''
			this.$refs.fileUpload.click();
		},
		uploadFile2() {
			// 先清理，再上传
			this.$refs.fileUpload2.value = ''
			this.$refs.fileUpload2.click();
		},
		triggerFileUpload() {
			this.uploadFile()
		},
		triggerFileUpload2() {
			this.uploadFile2()
		}
	}
}

</script>

<style scoped>
/deep/.el-table .warning-row {
	background: #f5c9bc;
}

/deep/.el-table .success-row {
	background: #c6ecb2;
}
/deep/.el-table .error-row {
	background: #f1a6a6;
}
.el-table tbody tr:hover>td { background-color: deepskyblue }
</style>
