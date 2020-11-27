//表单信息表
// select * from FORMINFO where RID = '92253233-b1ff-438e-9546-a5a3820ee6d8';
// -- update FORMDOMAININFO set PRID = '92253233-b1ff-438e-9546-a5a3820ee6d8' where PRID = '92253233-b1ff-438e-9546-a5a3820ee6d9';
//控件信息表
// select * from FORMDOMAININFO where PRID = '92253233-b1ff-438e-9546-a5a3820ee6d8';
// -- update PROCESSDEFINITIONINFO set FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d8' where FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d9';
// 流程信息定义表
// select * from PROCESSDEFINITIONINFO where FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d8';
// -- update LINKDEFINITIONINFO set FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d8' where FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d9';
//关联业务定义信息表
// select * from LINKDEFINITIONINFO where FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d8';
//基础表
// -- update JOB_BASE set BFRID = '92253233-b1ff-438e-9546-a5a3820ee6d8' where BFRID ='92253233-b1ff-438e-9546-a5a3820ee6d9';
// select BFRID from JOB_BASE where BFRID = '92253233-b1ff-438e-9546-a5a3820ee6d8';
//任务信息表
// -- update TASKINFO set FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d8' where FORMTEMPLATEID = '92253233-b1ff-438e-9546-a5a3820ee6d9';
// select FORMTEMPLATEID from TASKINFO where FORMTEMPLATEID ='92253233-b1ff-438e-9546-a5a3820ee6d8';



//创建sql执行语句
export function createSQLString(newId,oldId){
  var sqlTemplate = `-- 更新旧ID:${oldId} 为新的ID:${newId}';
update FORMINFO set RID = '${newId}' where RID='${oldId}';
update FORMDOMAININFO set PRID = '${newId}' where PRID = '${oldId}';
update PROCESSDEFINITIONINFO set FORMTEMPLATEID = '${newId}' where FORMTEMPLATEID = '${oldId}';
update LINKDEFINITIONINFO set FORMTEMPLATEID = '${newId}' where FORMTEMPLATEID = '${oldId}';
update JOB_BASE set BFRID = '${newId}' where BFRID ='${oldId}';
update TASKINFO set FORMTEMPLATEID = '${newId}' where FORMTEMPLATEID = '${oldId}';
-- ===============================================================================
`
return sqlTemplate;
}
