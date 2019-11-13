$(function () {
	var myChart = echarts.init(document.getElementById('map'));
	$.get('./Echarts/map.json', function (geoJson) {
		echarts.registerMap('Taiwan', geoJson, {});
		var cityCenterGeo = {
			'新北市' : ['121.6739', '24.91571'],
			'高雄市' : ['120.666', '23.01087'],
			'臺中市' : ['120.9417', '24.23321'],
			'臺北市' : ['121.5598', '25.09108'],
			'桃園縣' : ['121.2168', '24.93759'],
			'臺南市' : ['120.2513', '23.1417'],
			'彰化縣' : ['120.4818', '23.99297'],
			'屏東縣' : ['120.62', '22.54951'],
			'雲林縣' : ['120.3897', '23.75585'],
			'苗栗縣' : ['120.9417', '24.48927'],
			'嘉義縣' : ['120.574', '23.45889'],
			'新竹縣' : ['121.1252', '24.70328'],
			'南投縣' : ['120.9876', '23.83876'],
			'宜蘭縣' : ['121.7195', '24.69295'],
			'新竹市' : ['120.9647', '24.80395'],
			'基隆市' : ['121.7081', '25.10898'],
			'花蓮縣' : ['121.3542', '23.7569'],
			'嘉義市' : ['120.4473', '23.47545'],
			'臺東縣' : ['120.9876', '22.98461'],
			'金門縣' : ['118.3186', '24.43679'],
			'澎湖縣' : ['119.6151', '23.56548'],
			'連江縣' : ['119.5397', '26.19737'],
		}
		var convertData = function (data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
					var geoCoord = cityCenterGeo[data[i].name];
					if (geoCoord) {
							res.push({
									name: data[i].name,
									value: geoCoord.concat(data[i].value)
							});
					}
			}
			return res;
	};
	
		var option = {
			backgroundColor: '#404a59',
			tooltip: {
				trigger: 'item',
				formatter: function (val) {
					let name = val.name;
					let value = val.value[2];
					return name + '<br>' + value;
				}
			},
			legend: {
				orient: 'vertical',
				top: 'bottom',
				left: 'right',
				textStyle: {
					color: '#fff'
				}
			},
			visualMap: {
				min: 100,
				max: 50000,
				text: ['High', 'Low'],
				left: 'right',
				realtime: false,
				calculable: true,
				inRange: {
					color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8']
				}
			},
			geo: {
				map: 'Taiwan',
				center: [120.982025, 23.973875],
				label: {
					emphasis: {
						show: false
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#323c48',
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			series: [
				{
					// name: 'pm2.5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					hoverAnimation: true,
					data: convertData([
						{ name: '臺北市', value: 17000 },
						{ name: '宜蘭縣', value: 1000 },
						{ name: '高雄市', value: 5000 },
						{ name: '新北市', value: 20000 },
						{ name: '基隆市', value: 25000 },
						{ name: '臺中市', value: 30000 },
						{ name: '臺南市', value: 18000 },
						{ name: '新竹市', value: 2300 },
						{ name: '南投縣', value: 20000 },
						{ name: '嘉義縣', value: 16000 },
						{ name: '花蓮縣', value: 28000 }
					]),
					symbolSize: function (val) {
						return val[2] / 1000;
					},
					itemStyle: {
						emphasis: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				}
			]
		}
		myChart.setOption(option);
	});
});