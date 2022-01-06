import useCollection from "../Hooks/useCollection"
import {useAuth} from '../Hooks/useAuth'
import { useFirestore } from "../Hooks/useFirestore"
//
export default function TransactionList() {
    const {user}=useAuth()
    const {deleteDocFn}=useFirestore('Transactions')
    const query=["uid","==",user.uid]
    const createdAt=["createdAt","desc"]
    const {documents:Transactions,error}=useCollection('Transactions',query,createdAt)
    //
    return (
        <div className='list-div'>
            {error && <h3>{error}</h3>}
            <ul className="transaction-list">
                {Transactions &&Transactions.map(each=>{
                    return(
                    <li key={each.id} className="each-transaction">
                        <h3>{each.message}</h3>
                        <h4>{each.amount}</h4>
                        <p><i className="fas fa-times" id="delete-btn" onClick={()=>deleteDocFn(each.id)}></i></p>
                    </li>)
                })}
            </ul>
        </div>
    )
}
