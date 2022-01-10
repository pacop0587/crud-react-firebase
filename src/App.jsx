import { useState, useEffect } from 'react'
import {firebase} from './firebase'


function App() {
	//Hooks state
	const [listaTareas, setListaTareas] = useState([]);
	const [tarea, setTarea] = useState('');
	const [modoEdicion, setModoEdicion] = useState(false);
	const [id, setId] = useState('');

	//Leer documentos de firebase
	useEffect( () =>{
		const obtenerDatos = async() =>{
			try {
				const db = firebase.firestore()
				const data = await db.collection('tareas').get()
				const arrayData = data.docs.map( (doc) =>(
					{id: doc.id, ...doc.data()}	
				))
				setListaTareas(arrayData);
			} catch (error) {
				console.log(error);
			}
		}
		obtenerDatos()
	},[])

	//Agregar tareas nuevas 
	const agregarTarea = async (e) => {
		e.preventDefault()

		if([tarea].includes('')){
			console.log('Debes llenar el campo');
			return
		}
		
		try {
			
			const db = firebase.firestore();
			const nuevaTarea = {
				name: tarea,
				fecha: Date.now()
			}
			const data = await db.collection('tareas').add(nuevaTarea);
			setListaTareas([...listaTareas, {...nuevaTarea, id:data.id}])
			setTarea('');

		} catch (error) {
			console.log(error)
		}
	}

	//Eliminar tareas
	const eliminarTarea = async (id) =>{
		try {
			const db = firebase.firestore();
			await db.collection('tareas').doc(id).delete();

			const arrayFiltrado = listaTareas.filter(item => item.id !== id)
			setListaTareas(arrayFiltrado);

		} catch (error) {
			console.log(error)
		}
	}

	//Editar Tarea
	const activarEdicion = (item) =>{
		setModoEdicion(true);
		setTarea(item.name);
		setId(item.id);
	}

	const editarTarea = async (e) => {
		e.preventDefault();
		if([tarea].includes('')){
			console.log('Debes llenar el campo');
			return
		}

		try {
			const db = firebase.firestore();
			await db.collection('tareas').doc(id).update({
				name: tarea
			})
			const arrayEditado = listaTareas.map( (item) =>(
				item.id === id ? {id: item.id, fecha: item.fecha, name: tarea } : item
			))
			setListaTareas(arrayEditado);
			setModoEdicion(false);
			setTarea('')
			setId('');

		} catch (error) {
			console.log(error)
		}


	}


  return (
    <div className="container mt-3">
    	<div className="row">
			<div className="col-md-6">
				<h3>
					{
						modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
					}
				</h3>
				<form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
					<input type="text"
					       placeholder='Ingrese tarea'
						   className='form-control mb-2'
						   onChange={e => setTarea(e.target.value)}
						   value={tarea} />
					<div className="d-grid grap-2">
						<button className={ modoEdicion ? 'btn btn-warning': 'btn btn-dark'} type='submit'>
							{
								modoEdicion ? 'Editar' : 'Agregar'
							}
						</button>
					</div>
				</form>
			</div>
			<div className="col-md-6 mt-4">
				<ul className="list group">
					{
						listaTareas.map( (item) =>(
							<li className="list-group-item" key={item.id}>{item.name} 
								<button className="btn btn-danger btn-sm float-end mx-1" onClick={()=> eliminarTarea(item.id)}>
									Eliminar
								</button>
								<button className="btn btn-warning btn-sm float-end mx-1" onClick={()=> activarEdicion(item)}>
									Editar
								</button>
							</li>
							
						))
					}
				</ul>
			</div>
		</div>
    </div>
  )
}

export default App
