/**
 * Home controller.
 *
 * @author Eric Sundqvist
 * @version 1.0.0
 */
import elasticsearch from 'elasticsearch'
import { elasticQueries } from './elasticQueries.js'

const client = new elasticsearch.Client({
  host: process.env.BONSAI_URL,
  log: 'error'
})

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index(req, res, next) {
    const pieChartConf = await this.getPieChartConfigAndData(next)
    const stackBarConf = await this.getStackedBarChartConfigAndData(next)
    const viewData = {
      pieChartConfig: pieChartConf,
      stackBarConfig: stackBarConf
    }
    res.render('home/index', { viewData })
  }

  /**
   * Fetches data from elastic for Overall AQI category of the city of all cities in dataset. Maps the data and returns Chart.js config with data.
   *
   * @param {Function} next - Express next middleware function.
   * @returns {object} Chart.js config with data.
   */
  async getPieChartConfigAndData(next) {
    const resp = await client.search({
      index: 'air_quality',
      body: elasticQueries.allCitiesAQICategory
    })

    const rawData = resp.aggregations['0'].buckets

    return {
      type: 'pie',
      data: {
        // Array of labels, one for each AGI category
        labels: rawData.map((el) => el.key),
        datasets: [
          {
            label: 'Overall AQI category',
            // Array of values, one for each AGI category
            data: rawData.map((el) => el['1'].value),
            backgroundColor: [
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 255, 0, 0.5)',
              'rgba(255, 165, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
              'rgba(153, 0, 76, 0.5)'
            ],
            borderColor: [
              'rgba(0, 255, 0, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(255, 165, 0, 1)',
              'rgba(255, 0, 0, 1)',
              'rgba(153, 0, 76, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false
      }
    }
  }

  /**
   * Fetches data from elastic for selected cities and their AQ values. Maps the data and returns Chart.js config with data.
   *
   * @param {Function} next - Express next middleware function.
   * @returns {object} Chart.js config with data.
   */
  async getStackedBarChartConfigAndData(next) {
    const resp = await client.search({
      index: 'air_quality',
      body: elasticQueries.selectedCitiesAQvalues
    })

    const rawData = resp.aggregations['0'].buckets

    // Extract the city names
    const cityNames = Object.keys(rawData)

    // Extract and format the data for each city
    const cityData = cityNames.map((city) => {
      const cityBucket = rawData[city]
      return [cityBucket['1'].value, cityBucket['2'].value, cityBucket['3'].value, cityBucket['4'].value]
    })

    const chartData = {
      labels: cityNames,
      datasets: [
        {
          label: 'CO',
          // Array of CO values, one for each city
          data: cityData.map((city) => city[0]),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'NO2',
          // Array of NO2 values, one for each city
          data: cityData.map((city) => city[1]),
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Ozone',
          // Array of ozone values, one for each city
          data: cityData.map((city) => city[2]),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'PM2.5',
          // Array of PM2.5 values, one for each city
          data: cityData.map((city) => city[3]),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    }

    return {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    }
  }
}
