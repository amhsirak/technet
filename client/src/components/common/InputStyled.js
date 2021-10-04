import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const InputStyled = styled(TextField)(({ theme }) => 
`
  width: 300px;
  
  input, label {
    font-family: "Zilla Slab", serif
  }
`);

export default InputStyled;