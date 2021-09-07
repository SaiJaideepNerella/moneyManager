import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="full-monneyManager-container">
      <div className="monneyManager-container color1">
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
            alt=" balance"
            className="image"
          />
          <div className="balance-amount">
            <p className="paragraph">Your Balance</p>
            <p className="amount" testid="balanceAmount">
              Rs {balanceAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="monneyManager-container color2">
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="image"
          />
          <div className="balance-amount">
            <p className="paragraph">Your Income</p>
            <p className="amount" testid="incomeAmount">
              Rs {incomeAmount}
            </p>
          </div>
        </div>
      </div>
      <div className="monneyManager-container color3">
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
            alt="expenses"
            className="image"
          />
          <div className="balance-amount">
            <p className="paragraph">Your Expenses</p>
            <p className="amount" testid="expensesAmount">
              Rs {expensesAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
