export default {
items : [
    {
        question: [{
                type: "text",
                datas: "회사의 경영시스템 내에 기업 윤리와 관련한 팀에 건의 하고 싶은 사항을 기술해 주세요"
        }],
        articles: {
            type: "input",
        }
    },
    {
        question:[{
                type: "text",
                datas: "회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?"
        }],
        articles: {
            type: "select",
            form: ["예", "아니요", "모르겠다"]
        }
    },
    {
        question:[{
                type: "text",
                datas: "귀사의 행동 강령지침을 모두 선택 하세요"
        }],
        articles: {
            type: "check",
            form: ["이권 개입 등의 금지", "직위의 사적 이용 금지", "알선ㆍ청탁 등의 금지", 
            "금전의 차용 금지", "경조사의 통지와 경조금품의 수수 제한"]
        }
    },
    {
        question:[{
                    type: "text",
                    datas: "지속적인 측정 및 지속적인 환경 성과 개선을 포함하는 공식적인 환경 정책의 성과가 가장 좋다고 느끼는 년도는?"
        },
        {
            type: "table",
            datas: 
            {
                caption: "연도별 데이타",
                fields: [
                    {key: 'a1', label: '부서'},
                    {key: 'a2', label: '년도', sortable: true},
                    {key: 'a3', label: '담당자'},
                    {key: 'a4', label: '설명'}
                ],
                datas: [
                    {a1: '제 1 실', a2: '2013년', a3: '김과장', a4: "2013년도 성과"},
                    {a1: '제 2 실', a2: '2014년', a3: '김실장', a4: "2014년도 성과"},
                    {a1: '제 3 실', a2: '2015년', a3: '이대리', a4: "2015년도 성과"},
                    {a1: '제 4 실', a2: '2016년', a3: '정이사', a4: "2016년도 성과"},
                    {a1: '제 5 실', a2: '2017년', a3: '우실장', a4: "2017년도 성과"},
                    {a1: '제 6 실', a2: '2019년', a3: '정과장', a4: "2018년도 성과", _rowVariant: 'success'},
                ]
            }
        }],
        articles : 
            {
                "type": "select",
                "form": ["2013", "2014","2015", "2016","2017", "2019"]
            },
    },
    {
        question:[
                {
                    type: "text",
                    datas: "환경 성과 개선의 성과가 가장 좋았다고 느끼는 달은 언제 입니까?"
                },
                {
                    type: "chart",
                    datas: 
                    {
                        labels: ['1월', '2월', '3월', '4월', '5월',
                                 '6월', '7월', '8월', '9월', '10월',
                                 '11월', '12월'],
                        datasets: [{
                                      label: '성과(단위%)',
                                      backgroundColor: '#f87979',
                                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                                }]
                    }
        }],
        articles : {
            "type": "select",
            "form": ['1월', '2월', '3월', '4월', '5월','6월', '7월', '8월', '9월', '10월','11월', '12월']
        }
    },
    {
        question:[{
                type: "text",
                datas: "회사의 경영시스템 내에 기업 윤리와 관련한 팀을 운영하고 있습니까?"
        }],
        articles: {
            type: "select-file",
            form: ["예", "아니요", "모르겠다"]
        }
    },
]
}

    