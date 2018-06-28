// 用以进行html热调试
if (APP_ENV !== 'production') { //eslint-disable-line
    require('./page.html')
}
require('@/lib/common.js')
import './page.less'
import {newPatient, fetchPatientDetail, deletePatientByBlh, editPatient} from '@/api/patient'
import {fetchPatientSrc, fetchDoctorList} from '@/api/common'
import {getSearchParam} from '@/lib/utils'

const GDialog1 = require('@/components/gDialog/gDialog.js')
// const native = require('@/lib/native.js')
// $('#app').html('通过jquery')
// window.location.href = '../../index/index/page.html'
// native.startNextActivity(
//   {
//     nexturl: '../../index/index/page.html',
//     title: 'bbc',
//     flag: 3
//   }
// )
var patientSrc = []
var patientSrcSelector = null
var doctorList = []
var doctorListSelector = null
var isAdd = !getSearchParam('isEdit')
// var isAdd = 0
var blh = getSearchParam('blh') || '100272'
$(function () {
    GDialog1.render('gDialog1', {
        titleText: '确定要删除数据吗',
        hasCancel: true,
        ensureText: '确定',
        cancelText: '取消',
        onEnsureClick: () => {
            GDialog1.dismiss()
            deletePatient(blh)
        },
        onCancelClick: () => {
            GDialog1.dismiss()

        }
    })

    if (!isAdd) {
        loading()
        fetchPatientDetail(blh).then(
            res => {
                loadingdone()
                console.log(res)
                blh = res.data.Data[0].blh
                fillData(res.data.Data[0])
            }
        ).catch(
            e => {
                loadingdone()
                console.log(e)
            }
        )
    }
    // todo
    const GDialog = require('@/components/gDialog/gDialog.js')
    GDialog.render('gDialog', {
        titleText: '操作提示',
        contentText: '有必填项未完成，请先填写完成后在保存',
        ensureText: '确定',
        onEnsureClick: () => {
            GDialog.dismiss()
        }
    })
    $('#save').on('click', (e) => {
        if (validate()) {
            const form = {
                name: $('#patient-name').val(),
                phone: $('#patient-phone-number').val(),
                tel: $('#patient-tel-number').val(),
                sex: $('#sex-p .is-checked').attr('data-sex'),
                birth: $('#patient-birthday').val(),
                docid: $('#doctor-name').val() - 0,
                // 封装后的结果
                docname: $('#doctor-name_dummy').val(),
                hzsource: $('#patient-src_dummy').val(),
                address: $('#patient-addr').val()
            }
            if ($('#doctor-name_dummy').length == 0) {
                form.docname = $('#doctor-name').html();

            }

            if ($('#patient-src_dummy').length == 0) {
                form.hzsource = $('#patient-src').html();

            }
            console.log(form)
            // return
            if (isAdd) {
                loading()
                newPatient(form).then(
                    res => {
                        loadingdone()
                        console.log(res)
                        if (res.data.Data) {
                            Native.showToast('新增成功，病历号：' + res.data.Data)
                            Native.handleBackAction(true)
                        }
                    }
                ).catch(
                    e => {
                        loadingdone()
                        console.log(e)
                    }
                )
            } else {
                form.blh = blh
                loading()
                editPatient(form).then(
                    res => {
                        loadingdone()
                        if (res.data.Data) {
                            window.js.showToast("编辑成功");
                            Native.handleBackAction(true)
                        }
                    }
                ).catch(
                    e => {
                        loadingdone()
                        console.log(e)
                    }
                )
            }
        } else {
            GDialog.show()
        }
    })
    // 患者来源
    $('#patient-src-p').on('click', () => {
        if (patientSrcSelector) {
            patientSrcSelector.show()
        } else {
            fetchPatientSrcList()
        }
    })
    // 医生
    $('#doctor-name-p').on('click', () => {
        if (doctorListSelector) {
            doctorListSelector.show()
        } else {
            fetchDoctorSrcList()
        }
    })

    // 选择地址
    $("#addr-select").click(function () {
        Native.chooseLocation();
    })

    // 使用日期控件
    window.mobiscroll.date('#patient-birthday', {
        // theme: 'ios',
        display: 'bottom',
        dateFormat: 'yy-mm-dd',
        lang: 'zh'
    })
    // 切换性别
    $('#sex-p>label').on('click', function (e) {
        $(this).children('span').addClass('is-checked')
        $(this).siblings('label').children('span').removeClass('is-checked')
    })
})

// 验证数据
function validate() {
    var name = $('#patient-name').val();
    if (name.length == 0) {
        Native.showToast('请输入患者姓名');
        return false;
    }

    var phone = $('#patient-phone-number').val();
    if (phone.length == 0) {
        Native.showToast('请输入手机号码');
        return false;
    }

    var sex = $('#sex-p .is-checked').attr('data-sex');
    if (sex == undefined) {
        Native.showToast('请选择性别');
        return false;
    }

    var birth = $('#patient-birthday').val();
    if (birth == undefined || birth.length == 0) {
        Native.showToast('请选择出生年月');
        return false;
    }

    var dName = $('#doctor-name').val();
    if (dName == undefined || dName.length == 0) {
        Native.showToast('请选择医生');
        return false;
    }

    var hzSource = $('#patient-src').val();
    if (hzSource == undefined || hzSource.length == 0) {
        Native.showToast('请选择患者来源');
        return false;
    }
    return true
}

// 获取医生列表
function fetchDoctorSrcList() {
    loading()
    fetchDoctorList().then(
        res => {
            loadingdone()
            console.log(res)
            var length = res.data.Data.length
            for (var i = 0; i < length; i++) {
                doctorList.push({value: res.data.Data[i].id, text: res.data.Data[i].name})
            }
            doctorListSelector = window.mobiscroll.select('#doctor-name', {
                theme: 'ios',
                display: 'bottom',
                minWidth: 200,
                data: doctorList
            })
            doctorListSelector.show()
        }
    ).catch(
        e => {
            loadingdone()
            console.log(e)
        }
    )
}

// 获取患者来源列表
function fetchPatientSrcList() {
    loading()
    fetchPatientSrc().then(
        res => {
            loadingdone()
            var length = res.data.Data.length
            for (var i = 0; i < length; i++) {
                patientSrc.push({value: i, text: res.data.Data[i].name})
            }
            patientSrcSelector = window.mobiscroll.select('#patient-src', {
                theme: 'ios',
                display: 'bottom',
                minWidth: 200,
                data: patientSrc
            })
            patientSrcSelector.show()
        }
    ).catch(
        e => {
            loadingdone()
            console.log(e)
        }
    )
}

// 填充数据
function fillData(data) {
    // 有问题的返回数据
    // return
    // data = [
    //   {
    //     'name': '测试2',
    //     'sex': '男',
    //     'age': '18岁',
    //     'cfz': '复诊患者',
    //     'xfje': null,
    //     'qf': null,
    //     'blh': 1703076588,
    //     'ys': '',
    //     'jzsj': '2018-05-25 01:23:03',
    //     'yysj': null,
    //     'yybz': null,
    //     'bl': null
    //   }
    // ][0]
    console.log(data)
    $('#patient-number').val(blh)
    $('#patient-name').val(data.name),
        $('#patient-phone-number').val(data.tel2),
        $('#patient-tel-number').val(data.tel),
        $('#sex-p .is-checked').attr('data-sex'),
        $('#patient-birthday').val(data.birth),
        $('#doctor-name').val(data.doctend),
        $('#doctor-name').html(data.doctorname),
        $('#patient-src').html(data.hzsource),
        $('#patient-src').val(data.hzsource),
        $('#patient-addr').html(data.address),
        $('#patient-addr').val(data.address)
    $('.checkbox-radio-label-box').each(function () {
        // console.log($(this))
        var that = $(this)
        if (that[0].dataset.sex === data.sex) {
            that.addClass('is-checked')
        }
    })
}

// 删除
function deletePatient(blh) {
    loading()
    deletePatientByBlh(blh).then(
        res => {
            loadingdone()
            console.log(res)
            Native.handleBackAction(true)
        }
    ).catch(
        e => {
            loadingdone()
            console.log(e)
        }
    )
}

window.funRightTouch = function () {
    // GDialog1.show()
    deletePatient(blh)
}


// 选好状态后更新
window.setLocation = function (lat, lon, address) {
    // 更新地址
    $('#patient-addr').val(address);

}
