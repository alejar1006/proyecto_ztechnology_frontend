/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';    //para los formularios
import * as Yup from 'yup';        //para las validaciones inputs de los formularios
import axios from 'axios';


export default function CreateUser({load, setLoad}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
            
      <Button
        sx={{     //ESTILO CREAR USUARIO
          backgroundColor: '#F51F91',
          color: 'white',
        }}
        onClick={handleClickOpen}
      >
        Crear Usuario           {/*nombre del dialogo*/}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
    <Formik //formulario
        initialValues={{ 
            nombre: '', 
            correo: '',
            contraseña: '',
            idRol: '',
        }}
        
        
        validationSchema={Yup.object({
            nombre: Yup.string()                
                .min(7, 'Debe tener minimo 7 caracteres')
                .required('Por favor ingrese un nombre'),
            correo: Yup.string()
                .email('Dirección de correo no valida')
                .required('Por favor ingrese un correo electronco'),
            contraseña: Yup.string()                
                .min(6, 'La contraseña debe ser minimo 6 caracteres')
                .required('Por favor ingrese una contraseña'),
            idRol: Yup.number()
                .required('Por favor ingrese un Rol'),
        })}
        
        //codigo para enviar datos
        onSubmit={async(values, { setSubmitting }) => {            
            const response = await axios.post('http://localhost:3000/api/users/saveUsers', values);
            console.log(response);
            setLoad(!load);
            setOpen(false);
        
        }}
    >
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        
    }) => (
          <form onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">
              {"Crear un nuevo usuario"}                 {/*titulo del dialogo */}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  
                  <TextField                        
                      sx={{mt: 1}}
                      fullWidth
                      id="outlined-basic"
                      name="nombre"        //se pone el nombre del campo segun la base de datos 
                      label="Nombres" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.nombre}
                      error={errors.nombre}
                      helperText={errors.nombre}
                  />
                  
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="correo"
                      label="Correo Electronico" 
                      type="email"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.correo}
                      error={errors.correo}
                      helperText={errors.correo}
                  />
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="contraseña"        
                      label="Clave"
                      type="password" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.contraseña}
                      error={errors.contraseña}
                      helperText={errors.contraseña}
                  />
                  
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="idRol"        
                      label="Rol"
                      type="number" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.idRol}
                      error={errors.idRol}
                      helperText={errors.idRol}
                      
                  />
                  
                  
              </DialogContentText>
              </DialogContent>
              <DialogActions>          
                <Button
                  type='submit'
                  sx={{             //ESTILO BOTON REGISTRAR
                    backgroundColor: '#F51F91',
                    color: 'white',
                  }}
                  variant="outlined"                  
                >
                  Registrar
                </Button>
              </DialogActions>
          </form>
          )}
            </Formik>
        </Dialog>
    </div>
  );
}