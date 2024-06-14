import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [amount, setAmount] = useState(1)
  const [convertedAmount, setConvertedAmount] = useState(1)
   {/* importante ponerlo en 1 porque se empieza con USD to USD */}


  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        const currencyData = response.data.rates
        setCurrencies(Object.keys(currencyData))
      })
  }, [])

  const handleConvert = () => {
    axios.get(`https://open.er-api.com/v6/latest/${selectedCurrency}`)
      .then(response => {
        const rate = response.data.rates['USD']
        setConvertedAmount(amount * rate)
      })

  }

  return (
    <>
      <h1>exchange app</h1>
      <div className="card">

        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label >Choose a currency:</label>

         {/* hay que poner onchange y decirle que hacer son lo que se seleccione*/}
        <select 
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >

           {/* basicamente un for cada currency haz una opcion */}
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              
              {currency}
              
            </option>

          ))}
        </select>
        <button onClick={handleConvert}>
          convert
        </button>
  
          <p>Converted Amount: {convertedAmount} USD</p>

      </div>

    </>
  )
}

export default App
