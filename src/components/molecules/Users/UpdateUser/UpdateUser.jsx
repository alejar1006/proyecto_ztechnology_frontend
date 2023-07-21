
// eslint-disable-next-line no-unused-vars
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
export default function UpdateUser ({idUpdate, load, setLoad}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // eslint-disable-next-line no-unused-vars
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/users/consultUsers/${id}`);
    console.log(response.data.user);
    setFormData(response.data.user);
  }

  useEffect(() => {
      if (idUpdate) {
        consultUserById(idUpdate);
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
            correo: formData.correo || '',
            contraseña: formData.contraseña || '',
            idRol: formData.idRol || "",
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
          
        // eslint-disable-next-line no-unused-vars
        onSubmit={async(values, { setSubmitting }) => {

            const response = await axios.put('http://localhost:3000/api/users/updateUser', values);            
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
            {"Actualizacio de Usuario"}
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