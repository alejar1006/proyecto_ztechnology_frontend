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


export default function CreateProduct({load, setLoad}) {
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
        sx={{     //ESTILO CREAR PRODUCTO
          backgroundColor: '#F51F91',
          color: 'white',
        }}
        onClick={handleClickOpen}
      >
        Crear Producto           {/*nombre del dialogo*/}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
    <Formik
        initialValues={{ 
            nombre: '', 
            caracteristicas: '',
            valorUnitario: '',
            idUsuario: '',
        }}
        
        validationSchema={Yup.object({
            nombre: Yup.string()                
                .min(7, 'Debe tener minimo 7 caracteres')
                .required('Por favor ingrese un nombre'),
            caracteristicas: Yup.string()
                .min(7, 'Debe tener minimo 7 caracteres')
                .required('Por favor ingrese una caracteristica'),
            valorUnitario: Yup.number()                
                .required('Por favor ingrese un valor'),
            idUsuario: Yup.number()
                .required('Por favor ingrese su ID'),
        })}
        
        //codigo para enviar datos
        onSubmit={async(values, { setSubmitting }) => {            
            const response = await axios.post('http://localhost:3000/api/products/saveProducts/', values);
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
              {"Crear un nuevo Producto"}                 {/*titulo del dialogo */}
              </DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  
                  <TextField                        
                      sx={{mt: 1}}
                      fullWidth
                      id="outlined-basic"
                      name="nombre"        //se pone el nombre del campo segun la base de datos 
                      label="Nombre" 
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
                      name="caracteristicas"
                      label="Detalles del Producto" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.caracteristicas}
                      error={errors.caracteristicas}
                      helperText={errors.caracteristicas}
                  />
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="valorUnitario"        
                      label="Valor Unitario"
                      type="number" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.valorUnitario}
                      error={errors.valorUnitario}
                      helperText={errors.valorUnitario}
                  />
                  
                  <TextField 
                      sx={{mt: 3}}
                      fullWidth
                      id="outlined-basic"
                      name="idUsuario"        
                      label="Creado por ID:"
                      type="number" 
                      variant="outlined"
                      onChange={handleChange}
                      value={values.idUsuario}
                      error={errors.idUsuario}
                      helperText={errors.idUsuario}
                      
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