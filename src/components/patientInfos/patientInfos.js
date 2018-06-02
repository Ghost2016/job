const patientInfos = require('./patientInfos.ejs')
import './patientInfos.less'

const exportModule = {}
exportModule.render = function(id, { patientList, isPatientOfTheDay = false }) {
  exportModule.id = id
  const tempObj = {
    patientList: patientList,
    isPatientOfTheDay: isPatientOfTheDay
  }
  const ele = document.getElementById(id)
  ele.classList.add('_patient-infos')
  ele.innerHTML = patientInfos(tempObj)
  return exportModule
}
module.exports = exportModule
