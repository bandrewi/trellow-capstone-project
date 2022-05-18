import { useState } from "react"
import { useDispatch } from "react-redux"

import { createCard } from "../store/card"
import { deleteList, editList } from "../store/list"
import Card from "./Card"
import './list.css'

export default function List({ list }) {
    const dispatch = useDispatch()
    const [cardTitle, setCardTitle] = useState('')

    // ADD CARD DISPLAY
    function displayInput() {
        document.getElementById(`add-card-${list.id}`).style.display = 'none'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-input-${list.id}`).focus()
    }

    function hideInput() {
        document.getElementById(`add-card-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'none'
    }

    function addCard() {
        dispatch(createCard(list.cards.length + 1, cardTitle, list.id))
        hideInput()
        setCardTitle('')
    }

    // LIST FUNCTIONS
    function handleDelete() {
        dispatch(deleteList(list.id, list.board_id))
    }

    const handleEdit = (e) => {
        // CHANGE ORDER BASED ON DRAG DROP
        const listTitle = e.target.innerText
        if (listTitle === '') {
            e.target.innerText = list.title
            return
        }
        if (list.title !== listTitle) {
            dispatch(editList(list.id, list.order, listTitle))
        }
        return
    }

    return (
        <>
            <div id="list-title-container" className="flex-row">
                <h2
                    id={`list-title-${list.id}`}
                    className='list-title'
                    contentEditable='true'
                    onBlur={handleEdit}
                >
                    {list.title}
                </h2>
                <div id='list-delete-btn' onClick={handleDelete}>ⓧ</div>
            </div>
            <ul id="card-container">
                {list.cards.map(card => (
                    <li key={card.id} className='card-li'>
                        <Card card={card} />
                    </li>
                ))}
                <li id="add-card-container">
                    <div id={`add-card-${list.id}`} onClick={displayInput}>
                        <span id="add-card-text">＋Add a card</span>
                    </div>
                    <div id={`add-card-div-${list.id}`}
                        style={{ display: 'none' }}
                        onBlur={hideInput}
                    >
                        <input
                            id={`add-card-input-${list.id}`}
                            type="text"
                            placeholder="Enter a list title..."
                            value={cardTitle}
                            onChange={e => setCardTitle(e.target.value)}
                        >
                        </input>
                        <button
                            id='add-card-btn'
                            onMouseDown={addCard}
                            disabled={!cardTitle}
                        >
                            Add Card
                        </button>
                    </div>
                </li>
            </ul>
        </>
    )
}