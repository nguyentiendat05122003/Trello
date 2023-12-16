export const generatePlaceholderCard = (column) => {
    return {
        _id: `card-id-${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceholderCard: true
    }
}