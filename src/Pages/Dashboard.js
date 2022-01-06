import './Dashboard.css'
import TransactionList from '../Components/TransactionList'
import TransactionForm from '../Components/TransactionForm'
export default function Dashboard() {
    return (
        <div className="dashboard">
            <TransactionList/>
            <TransactionForm/>
        </div>
    )
}
