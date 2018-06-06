import fetch from '@/lib/fetch'

/**
 * 新增病历
 *
 */

export function addAnamnesis({ today }) {
  return fetch({
    url: 'Emr/Add',
    data: {
      "actoken": "EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G",
      "Data": {
        "blh": 32030515,
        "seeno": 12,
        "seedate": "2014-05-11 09:24:18",
        "czfz": null,
        "doctor": 3,
        "narrate": "左下后牙疼痛2天",
        "ext1": null,
        "history": "2天来左下后牙自发性阵发性疼痛，遇冷热加重。",
        "advice": "不适随诊",
        "operater": 1,
        "name": "王雯1",
        "docname": "吴宏章",
        "checks": [
          {
            "blh": 32030515,
            "seeno": 12,
            "wcheck": "颌面充填物，松动，边缘龋坏，叩(+),冷热疼痛加重，牙体松动I.",
            "p1": "",
            "p2": "",
            "p3": "",
            "p4": "6",
            "numb": 1
          }
        ],
        "others": [
          {
            "blh": 32030515,
            "seeno": 12,
            "desc1": "",
            "p1": "",
            "p2": "",
            "p3": "",
            "p4": "",
            "numb": 1
          }
        ],
        "diagnoses": [
          {
            "blh": 32030515,
            "seeno": 12,
            "diagnose": "牙髓炎",
            "p1": "",
            "p2": "",
            "p3": "",
            "p4": "6",
            "numb": 1
          }
        ],
        "plans": [
          {
            "blh": 32030515,
            "seeno": 12,
            "hzplan": "",
            "p1": "",
            "p2": "",
            "p3": "",
            "p4": "",
            "numb": 1
          }
        ],
        "cures": [
          {
            "blh": 32030515,
            "seeno": 12,
            "cure": "局麻下开髓，丁香油开放。",
            "p1": "",
            "p2": "",
            "p3": "",
            "p4": "6",
            "numb": 1
          }
        ]
      },
    },
    method: 'post'
  })
}