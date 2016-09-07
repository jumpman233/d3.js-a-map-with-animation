//安全事件比例
var optionSafeEventPercent = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        textStyle: {
            color: '#ADB4B4',
            fontSize: '10'
        },
        itemWidth:8,
        itemHeight:8,
        orient: 'vertical',
        left: '64%',
        data: ['已解决的安全事件','未解决的安全事件']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            label: {
                normal: {
                    show: false
                }
            },
            data:[
                {
                    value: 50,
                    name: '已解决的安全事件',
                    itemStyle: {
                        normal: {
                            color: "#1590B1"
                        }
                    }
                },
                {
                    value: 50,
                    name: '未解决的安全事件',
                    itemStyle: {
                        normal: {
                            color: "#CEAA57"
                        }
                    }
                },
            ]
        }
    ]
}
var optionAttackType = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        textStyle: {
            color: '#ADB4B4',
            fontSize: '10'
        },
        itemWidth:8,
        itemHeight:8,
        orient: 'vertical',
        left: '70%',
        data: ['SYN-Flood','UDP-Flood','CC','ACK-Flood','DNS-Flood']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            label: {
                normal: {
                    show: false
                }
            },
            data:[
                {
                    value: 20,
                    name: 'SYN-Flood',
                    itemStyle: {
                        normal: {
                            color: "#227C97"
                        }
                    }
                },
                {
                    value: 20,
                    name: 'UDP-Flood',
                    itemStyle: {
                        normal: {
                            color: "#1193B6"
                        }
                    }
                },
                {
                    value: 20,
                    name: 'CC',
                    itemStyle: {
                        normal: {
                            color: "#CA804F"
                        }
                    }
                },
                {
                    value: 20,
                    name: 'ACK-Flood',
                    itemStyle: {
                        normal: {
                            color: "#D1AA57"
                        }
                    }
                },
                {
                    value: 20,
                    name: 'DNS-Flood',
                    itemStyle: {
                        normal: {
                            color: "#3EA18D"
                        }
                    }
                },
            ]
        }
    ]
}

var optionLoopholeDangerLevel = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        textStyle: {
            color: '#ADB4B4',
            fontSize: '10'
        },
        itemWidth:8,
        itemHeight:8,
        orient: 'vertical',
        left: '70%',
        data: ['高危','中危','低危']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '60%'],
            label: {
                normal: {
                    show: false
                }
            },
            data:[
                {
                    value: 30,
                    name: '高危',
                    itemStyle: {
                        normal: {
                            color: "#C04430"
                        }
                    }
                },
                {
                    value: 30,
                    name: '中危',
                    itemStyle: {
                        normal: {
                            color: "#D3683D"
                        }
                    }
                },{
                    value: 30,
                    name: '低危',
                    itemStyle: {
                        normal: {
                            color: "#D07E43"
                        }
                    }
                },
            ]
        }
    ]
}