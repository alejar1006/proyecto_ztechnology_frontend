/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function UpdateProduct ({idUpdate, load, setLoad}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultProductById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/products/consultProducts/${id}`);
    console.log(response.data.product);
    setFormData(response.data.product);
  }

  useEffect(() => {
      if (idUpdate) {
        consultProductById(idUpdate);
      }
      setOpen(idUpdate ? true : false);
  }, [idUpdate])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <Formik
        enableReinitialize
        initialValues={{
            id: idUpdate,
            nombre: formData.nombre || '',
            caracteristicas: formData.caracteristicas || '',
            valorUnitario: formData.valorUnitario || '',
            idUsuario: formData.idUsuario || "",
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
          
        // eslint-disable-next-line no-unused-vars
        onSubmit={async(values, { setSubmitting }) => {

            const response = await axios.put('http://localhost:3000/api/products/updateProduct/', values);            
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
         /* and other goodies */
       }) => (
        <form onSubmit={handleSubmit}>        
            <DialogTitle id="alert-dialog-title">
            {"Actualizacion de Producto"}
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
            <Button type='submit'>
                Actualizar
            </Button>
            </DialogActions>
        </form>
        )}
        </Formik>
      </Dialog>
    </div>
  );
}