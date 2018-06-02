// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { fetchContacts } from '@/api/patient'
const Contacts = require('@/components/contacts/contacts.js')

$(function() {
  fetchContacts().then(
    res => {
      const data = res.data.Data
      console.log(data)
      Contacts.render('contacts', { data })
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
})
