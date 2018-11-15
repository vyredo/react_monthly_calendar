import { lightblue, darkblue, grey } from "../indexStyle";

const cellWidth = 70
const cellHeight = 60

export const timeCellStyle = {
    width: cellWidth,
    height: cellHeight,
    border: `1px solid ${grey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    flexDirection: 'column',
    cursor: 'pointer',
    marginBottom: 15,
    borderRadius: 5
}


export const timeCellHover = {
    ...timeCellStyle,
    backgroundColor: darkblue,
    color: 'white'
}

export const timeCellBodyStyle = {
    color: lightblue,
    fontSize: 12
}