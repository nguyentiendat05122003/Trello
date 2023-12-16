import { Box} from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import mapOrder from '~/utils/sort'
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, closestCorners, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import {arrayMove, sortableKeyboardCoordinates,} from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column'
import CardItem from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep , isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'

const STATUS_ITEM_DRAGGING = {
  COLUMN :'column',
  CARD : 'card'
}

export default function BoardContent({board}) {

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [orderColumns,setOrderColumns] = useState([])
  // info item dragging
  const [activeDragType,setActiveDragType] = useState(null)
  const [activeDragData,setActiveDragData] = useState(null)
  const [activeDragId,setActiveDragId] = useState(null)
  const [oldColumnWhenDragging,setOldColumnWhenDragging] = useState(null)

  const findColumnCardId =(cardId) =>{
    return orderColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }
  const handleDragEnd = (event)=>{
    const {active,over} = event
    if(!over || !active) return

    if(activeDragType === STATUS_ITEM_DRAGGING.CARD){
      const {id: activeDraggingCartId , data:{current:activeDraggingCardData}} = active
      const {id: overCardId} = over
      const activeColumn = findColumnCardId(activeDraggingCartId)
      const overColumn = findColumnCardId(overCardId)
      if(!oldColumnWhenDragging || !overColumn) return
      if(oldColumnWhenDragging._id !== overColumn._id){
        moveCardBetweenDifferentColumns(overColumn,overCardId,active,over,activeColumn,activeDraggingCartId ,activeDraggingCardData)
      } 
      else{
        //ví trị item cũ
        const oldCardIndex = oldColumnWhenDragging?.cards?.findIndex((column) => column._id === activeDragId)
        // ví trí mới
        const newCardIndex = overColumn?.cards?.findIndex((column) => column._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDragging.cards,oldCardIndex,newCardIndex);

        setOrderColumns((prevOrderColumns)=>{
          const nextColumns = cloneDeep(prevOrderColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card)=> card._id)
          return [...nextColumns]
        })
      }
    }
    if(activeDragType === STATUS_ITEM_DRAGGING.COLUMN){
      if(active.id !== over.id){
        //ví trị item cũ
        const oldColumnIndex = orderColumns.findIndex((column) => column._id === active.id)
        // ví trí mới
        const newColumnIndex = orderColumns.findIndex((column) => column._id === over.id)
        const dndOrderedColumn = arrayMove(orderColumns,oldColumnIndex,newColumnIndex);
  
        setOrderColumns(dndOrderedColumn)
      }
    }
    setActiveDragData(null)
    setActiveDragId(null)
    setActiveDragType(null)
    setOldColumnWhenDragging(null)

  }

  const handelDragOver = (event)=>{
    if(activeDragType === STATUS_ITEM_DRAGGING.COLUMN) return

    const {active,over} = event
    if(!active || !over) return

    const {id: activeDraggingCartId , data:{current:activeDraggingCardData}} = active

    const {id: overCardId} = over

    const activeColumn = findColumnCardId(activeDraggingCartId)
    const overColumn = findColumnCardId(overCardId)

    if(!activeColumn || !overColumn) return
    
    if(activeColumn._id !== overColumn._id){
      moveCardBetweenDifferentColumns(overColumn,overCardId,active,over,activeColumn,activeDraggingCartId ,activeDraggingCardData)
    }

  }

  const handleDragStart = (event)=>{
    if(!event.active) return  
    setActiveDragId(event?.active.id)
    setActiveDragData(event?.active.data?.current)
    setActiveDragType(event?.active.data?.current?.columnId ? STATUS_ITEM_DRAGGING.CARD : STATUS_ITEM_DRAGGING.COLUMN )
    
    //drag card
    if(event?.active.data?.current?.columnId){
      setOldColumnWhenDragging(findColumnCardId(event?.active.id))
    }
  }

  useEffect(()=>{
    setOrderColumns(mapOrder(board?.columns,board?.columnOrderIds,'_id'))
  },[board])

  const customAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles:{
        active:{
            opacity:'0.5'
        }
      }
    })
  }

  const moveCardBetweenDifferentColumns = (overColumn,overCardId,active,over,activeColumn,activeDraggingCartId ,activeDraggingCardData)=>{
    setOrderColumns((prevOrderColumns)=>{
      const overCardIndex = overColumn?.cards?.findIndex((card)=> card._id === overCardId)
      let newCardIndex;
      const isBelowOverItem = active.rect.current.translated &&
              active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex =  overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1;

      const nextColumns = cloneDeep(prevOrderColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn  = nextColumns.find(column => column._id === overColumn._id)

      if(nextActiveColumn){
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCartId)
        if(isEmpty(nextActiveColumn.cards)){
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.filter(card => card._id )
      }
      if(nextOverColumn){
        
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCartId)

        const rebuild_activeDraggingCardData = {...activeDraggingCardData,columnId:nextActiveColumn._id}
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex,0,rebuild_activeDraggingCardData)

        nextOverColumn.cards = nextOverColumn.cards.filter((card)=> !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    }) 
  }
  return (
      <DndContext sensors={sensors} 
        onDragEnd={handleDragEnd} 
        onDragStart={handleDragStart} 
        onDragOver={handelDragOver}
        collisionDetection={closestCorners}
      >
        <Box 
        sx={{
          width:'100%',
          height:(theme)=>`${theme.trello.boardContentHeight}`,
          display:"flex",
          overflowX:'auto',
          overflowY :'hidden'
        }}>
           <ListColumns columns={orderColumns}/>
          <DragOverlay dropAnimation={customAnimation}>
            {!activeDragId && null}
            {activeDragId && activeDragType === STATUS_ITEM_DRAGGING.COLUMN && <Column column={activeDragData}/>}
            {activeDragId && activeDragType === STATUS_ITEM_DRAGGING.CARD && <CardItem card={activeDragData}/>}
          </DragOverlay>
        </Box>
      </DndContext>
  )
}
