import Input from './Input'

const Filter = ({handler, search}) => 
    <div style={{filter: 'drop-shadow(0px 3px 5px gray)', padding: '5px 20px 10px 20px', marginBottom: '15px'}}>
        <Input caption={'search for:'}handler={handler} search={search} />
    </div>

export default Filter