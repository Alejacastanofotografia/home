var c = 'console.log'; 
firebase.initializeApp({
    apiKey: "AIzaSyBq-VhsTf1ip5Le7FDIAXJA-qBpQ_91W4g",
    authDomain: "contacto-de-usuarios.firebaseapp.com",
    databaseURL: "https://contacto-de-usuarios.firebaseio.com",
    projectId: "contacto-de-usuarios",
    storageBucket: "contacto-de-usuarios.appspot.com",
    messagingSenderId: "38625858230",
    appId: "1:38625858230:web:44ad53d6d12d043d134c17",
    measurementId: "G-0GSH2MDHRG"
});
var db = firebase.firestore();
var contacto = db.collection('Contacto');
var Visitante = db.collection('Visitante');
// contadores	
var contadorContacto = db.collection('ContactoContador').doc('Total');
var contadorVisitas = db.collection('VisitanteContador').doc('Total');


// Extrayendo los contactos
function mostrarDatos(tipoFiltro){
	if(tipoFiltro === 'Pendiente'){
    db.collection('Contacto').where('aa_estado', '==', 'Pendiente').get()
	.then((snapshot) => {datos(snapshot.docs)});
	}
	else if(tipoFiltro === 'Contactado'){
    db.collection('Contacto').where('aa_estado', '==', 'Contactado').get()
	.then((snapshot) => {datos(snapshot.docs)	   });
	}
	else if(tipoFiltro === 'En proceso'){
    db.collection('Contacto').where('aa_estado', '==', 'En proceso').get()
	.then((snapshot) => {datos(snapshot.docs)});
	}
	else if(tipoFiltro === 'Imposible contactar'){
    db.collection('Contacto').where('aa_estado', '==', 'Imposible contactar').get()
	.then((snapshot) => {datos(snapshot.docs)});
	}
	else{
    db.collection('Contacto').orderBy('a_contactoNo', 'desc')	
    .get().then((snapshot) => {datos(snapshot.docs)});
	}
		
}

var datosfirebase = document.getElementById('datosfirebase');
const deletetask = id => db.collection('Contacto').doc(id).delete();
const datos = data => {
			let nummm = 0;
	if(data.length){
		document.getElementById('totalContactosbutton').value = data.length;
		let html= '';
		data.forEach(doc => {	
			nummm++;
			const post = doc.data();
			const li = `
			    <li class="lifirebase">
				    <div class="contenedorEstadoNum">
					    <input type="button" value="${post.a_nombre}" class="nombreDetalles">
						<div style="display: flex; align-items: center;">
				            <button class='editContacto fas btnEdit' data-id="${doc.id}" >&#xf4ff;</button>
						    <button class="deleteContacto material-icons btndelete" data-id="${doc.id}" >&#xe92b;</button>
			  			</div>
					</div>
				    <div class="contenedorEstadoNum">
				        <p>No: ${post.a_contactoNo}</p>
				        <p class="listaComentarios">
				           <i><span style="color: #909090">Estado: </span><span> ${post.aa_estado}</span></i>
					       <i class='far'>&#xf059;</i>
						   <span class="comentariosInternos">${post.g_Observaciones}</span>
				        </p>
				    </div>
				   <p>Teléfono: ${post.b_teléfono}</p>
				   <p>Correo: ${post.c_correo}</p>
				   <p> <i style='font-size:1rem' class='far'>&#xf073;</i> ${post.e_fechaMensaje}</p>
				   <p class="comentariosPost"><i style='font-size:1rem; padding: .4rem; color:#202020' class='far'>&#xf4ad;</i><br />${post.d_mensaje}</p>
				</li>  
			`;
			html += li;
		});
		datosfirebase.innerHTML = html;
	}
	else {
		document.getElementById('totalContactosbutton').value = 0;
		datosfirebase.innerHTML = `<p style="color: #ff0000; padding: 2rem; font-size:1rem"> No existen registros</p>`;
	}	
			const btndelete = document.querySelectorAll('.btndelete');
			btndelete.forEach(deleteContacto => {
			    deleteContacto.addEventListener('click', (e) => {
					deletetaskf(e.target.dataset.id);
					
			    })
			});
			const btnEdit = document.querySelectorAll('.btnEdit');
			btnEdit.forEach(editContacto => {
				editContacto.addEventListener('click', (e) =>{
					editarContacto(e.target.dataset.id);
				} )
				
			});
}
// extrayendo el número de visitas
function mostarDatos2(){
	db.collection('Visitante').orderBy('a_No', 'desc')
	.get()
	.then((snapshot) =>{
		datos2(snapshot.docs)
	});
}
let datosfirebaseVisitas = document.getElementById('datosfirebaseVisitas');
const datos2 = data => {
	let num = true;
	if(data.length){
		document.getElementById('totalVisitas').value = data.length;
			let html = '';
		data.forEach(doc => {
			const datosVisitas = doc.data();
			const li = `
			    <li class="lifirebaseVisitas">
				    <p class="nombreDetalles2"> ${datosVisitas.b_fecha} </p>
                    <p>No: ${datosVisitas.a_No}</p> 			   
                    <p>Dimensiones: ${datosVisitas.dimensiones}</p> 	   
			   </li>
			`;
			html += li;
		});
	    datosfirebaseVisitas.innerHTML = html;
		}
	 else {
		datosfirebaseVisitas.innerHTML = `<p style="color: #ff0000; padding: 2rem; font-size:1rem"> No existen registros</p>`;
	}
}
let detallesToggle = true;
function mostrarDetalles(ventana, item){
	var i, elementos, nombreDetalles, nombreDetalles2, filtro, Contelementos;
	elementos = document.querySelectorAll(`.${ventana} p`);
	Contelementos = document.querySelectorAll(`.${item} .listaContacto .${ventana}`);
	ContelementosP = document.querySelectorAll(`.${item} .listaContacto .${ventana} p`);
	nombreDetalles = document.querySelectorAll('.nombreDetalles');
	nombreDetalles2 = document.querySelectorAll('.nombreDetalles2');
	
		for(i = 0; i < Contelementos.length; i++){
			Contelementos[i].style.display = 'flex';
			Contelementos[i].style.flexDirection = 'column';
		}
		if(detallesToggle){
	        for( var i = 0; i < elementos.length; i++){
	           elementos[i].style.display = 'block';		
	        }
		if(item ==='itemUsuarios'){
	    for( var i = 0; i < nombreDetalles.length; i++){
	        nombreDetalles[i].style.display = 'flex';
	        nombreDetalles[i].style.color = '#fff';
  	    }}else{
	    for( var i = 0; i < nombreDetalles2.length; i++){
	        nombreDetalles2[i].style.display = 'flex';
		  	nombreDetalles2[i].style.color = '#00ccff'}
	    }
	
	        detallesToggle = false;
	    } 
	    else{
	        for( var i = 0; i < elementos.length; i++){
	            elementos[i].style.display = 'none';		
	        }
		if(item ==='itemUsuarios'){
	    for( var i = 0; i < nombreDetalles.length; i++){
	        nombreDetalles[i].style.display = 'flex';
	        nombreDetalles[i].style.color = '#606060';
  	    }}else{
	    for( var i = 0; i < nombreDetalles2.length; i++){
	        nombreDetalles2[i].style.display = 'flex';
		  	nombreDetalles2[i].style.color = '#606060'}
	    }
	        detallesToggle = true;
		
	    }
	
}

let totalVisi;
let totalVisi1;
let totalContac;
let totalContac1;

const consultaCantidad = () =>{
	db.collection('VisitanteContador')
	.get()
	.then((snapshot) => {
		snapshot.forEach((doc) => {
			let datos = doc.data();
			let numero = datos.No;
		 totalVisi = numero +1;
		 visitas(totalVisi)			
		})		
	});	
}
const visitas = (VisiTotal) => {	
	let f = new Date();
	let fS = f.toString();
	
	let formatoFecha = f.toLocaleDateString();
	let formatoHora = f.toLocaleTimeString();
	let fechaCompleta = formatoFecha +', ' + formatoHora;
	let width = screen.width;
	let height = screen.height;
	
	
	let NombreFecha = fS+VisiTotal;	
	if(width === 360 || width === 1440){
			console.log('paila');
	}else{
	    Visitante.doc(NombreFecha).set({
			a_No : VisiTotal,
			b_fecha : fechaCompleta,
			c_date : fS,
			dimensiones : [width , height]
		})
		.then(function(){
			console.log('Thanks');
		})
		.catch(function(error){
			console.log(error);
		});
		    contadorVisitas.update({
		    No: firebase.firestore.FieldValue.increment(1)
	    });
	    }
	
}
//accediendo a los elementos del formulario
let nombre = document.getElementById('name');
let telefono = document.getElementById('telefono');
let email = document.getElementById('email');
let mensaje = document.getElementById('mensaje');

let formulario = document.getElementById('formularioContacto');
let mensajeError = document.getElementById('mensajesFormulario');
let mensajeErrorGrave = document.getElementById('mensajesFormularioGrave');
let mensajeErrorExitoso = document.getElementById('mensajeExitoso');
let contactoNumero;
formulario.addEventListener('submit', function(evt){
		mensajeError.style.display = 'flex';
		mensajeErrorExitoso.style.display = 'flex';
		mensajeErrorGrave.style.display = 'flex';
	
	evt.preventDefault();
	
	db.collection('ContactoContador')
	.get()
	.then((snapshot) => {
		snapshot.forEach((doc) =>{
			 let datos = doc.data();
		 totalContac1 = datos.No;
		 totalContac = parseInt(totalContac1) +1;
		 nuevoContacto(totalContac);
		})
		
	});	
// añadido	
});
const nuevoContacto = (totalContactos) => {	
	let nombreUsuario = nombre.value;
	let telefonoUsuario = telefono.value;
	let emailUsuario = email.value;
	let mensajeUsuario = mensaje.value;
	let width = screen.width;
	let height = screen.height;	
	//acomodando los formatos
	let f2 = new Date();
	let fS2 = f2.toString();
	
	let formatoFecha2 = f2.toLocaleDateString();
	let formatoHora2 = f2.toLocaleTimeString();
	let fechaCompleta2 = formatoFecha2 +', ' + formatoHora2;	 
	// validar datos del formulario
	   contactoNumero = totalContactos; 
	if(nombreUsuario === null || nombreUsuario === ''){
		mensajeError.classList.add('error');
		mensajeError.innerHTML = '¡Ups! El campo "Nombre" es requerido.';
		nombre.style.border = '2px solid #ff0000';
	}
	else if(telefonoUsuario === null || telefonoUsuario === ''){
		mensajeError.classList.add('error');
		mensajeError.innerHTML = '¡Ups! El campo "Télefono" es requerido.';
		telefono.style.border = '2px solid #ff0000';
		nombre.style.border = 'none';
	}
	else if(isNaN(telefonoUsuario)){
		mensajeError.classList.add('error');
		mensajeError.innerHTML = '¡Ups! El campo "Télefono" debe contener un número.';
		telefono.style.border = '2px solid #ff0000';
		nombre.style.border = 'none';
	}
	else{	
	    contacto.doc(nombreUsuario).set({
			a_nombre : nombreUsuario,
			a_contactoNo : contactoNumero,
			b_teléfono : telefonoUsuario,
			c_correo : emailUsuario,
			d_mensaje : mensajeUsuario,
			e_date : fS2,
			e_fechaMensaje : fechaCompleta2,
		    f_Dimensiones :[width, height],
			aa_estado : 'Pendiente',
			g_Observaciones : 'Sin comentatios.'
			
		})
		.then(function(){
			// resetando los campos...// Confirmacion de registro
		        mensajeError.classList.add('EnvioExitoso');
		        mensajeError.style.color = '#202020'; 
				mensajeErrorExitoso.innerHTML = '&#10004;'; 
				mensajeError.innerHTML = '¡Gracias ' + nombreUsuario + 
		                         '! me pondré en contacto contigo en el menor tiempo posible al número ' + 
								 telefonoUsuario + ' .' + ' Si este número no es correcto ingresalo de nuevo.';
	        nombre.value = '';
	        telefono.value = '';
	        email.value = '';
	        mensaje.value = '';
		    nombre.style.border = 'none';
		    telefono.style.border = 'none';
		})
		.catch(function(error){
			console.log(error);
		        mensajeError.classList.add('error');
				mensajeErrorGrave.innerHTML = '&#9888; '; 
				mensajeError.innerHTML = '¡Oh ' + nombreUsuario + 
		                         '! Se ha presentado un inconveniente inesperado, '+
								 ' por favor escribeme al whatsapp 3148582037 o '+
								 'al correo alejacastanofotografia@gmail.com, '+
								 'anexa tus datos y te contactaré en el menor tiempo posible.';
	        nombre.value = '';
	        telefono.value = '';
	        email.value = '';
	        mensaje.value = '';
		    nombre.style.border = 'none';
		    telefono.style.border = 'none';
		});
       
	   
	    contadorContacto.update({
			No: firebase.firestore.FieldValue.increment(1)
		});
    setTimeout(function(){
		mensajeError.style.display = 'none';
		mensajeErrorExitoso.style.display = 'none';
		mensajeErrorGrave.style.display = 'none';
	    }, 8000);
	}
}
		


var validar = true;
var validarFiltro = true;
var deleteT; 
var deleteF; 
function mostrarFiltros(){
	if(validarFiltro){document.querySelector('.contenedorFiltros').style.display = 'block';
	    validarFiltro = false}
	else{document.querySelector('.contenedorFiltros').style.display = 'none';
	    validarFiltro = true}
}
function showdelete(){
	document.getElementById('AlertaEliminar').style.display = 'none';
	validar = true
}
function showEditar(){
	document.getElementById('AlertaEditar').style.display = 'none';
	document.getElementById('nuevosComentarios').value = 'Sin comentarios';
	document.getElementById('nuevosComentarios').style.background = '#aaa';
	validarEdit = true; escribiendo = true;
}
function deletetaskf(id){
    if(validar){
		    document.getElementById('AlertaEliminar').style.display = 'flex';
	    	document.getElementById('archivoEliminar').value = id;
			deleteT = document.getElementById('archivoEliminar');
			validar = false;
	}
	else{
	deleteF = deleteT.value; 
	
	db.collection('Contacto').doc(deleteF)
	.delete()
	.then(function(){
		console.log('se ha eliminado el documento con Id= ' + deleteF);
		mostrarDatos()
	});
	validar = true;
	}
}
var validarEdit = true;
var editT, editF, editOption, editOptionF, newComent, newComentF; 
var validarInput = document.getElementById('nuevosComentarios');
var escribiendo = true;
validarInput.addEventListener('input', () =>{
	if(escribiendo){
	document.getElementById('nuevosComentarios').value = '';
		document.getElementById('nuevosComentarios').style.width = 'auto';
		document.getElementById('nuevosComentarios').style.background = '#aaa';
    escribiendo = false;
    }
	else{
		document.getElementById('nuevosComentarios').style.background = '#fff';
		document.getElementById('nuevosComentarios').style.width = '100%';
		}
});
function editarContacto(id){
	if(validarEdit){
		document.getElementById('AlertaEditar').style.display = 'flex';
		document.getElementById('archivoEditar').value = id;
		editT = document.getElementById('archivoEditar');
		editOption = document.getElementById('idselect');
	    newComent = document.getElementById('nuevosComentarios');
		validarEdit = false
	}else{
		editF = editT.value;
		editOptionF = editOption.value;
		newComentF = newComent.value;
		db.collection('Contacto').doc(editF)
		.update({
			'aa_estado': editOptionF,
			'g_Observaciones': newComentF,
		})
		
	    .then(function(){
			 console.log('actualizado');
			 mostrarDatos()
	    });
		showEditar();
		validarEdit = true;
		
	    document.getElementById('nuevosComentarios').value = 'Sin comentarios';
	    document.getElementById('nuevosComentarios').style.background = '#aaa';
	    escribiendo = true;
	}
}
var loginDeUusarios = db.collection('LoginDeUsuarios');
function crearUsuario(){
	let fecha = new Date().toString();
	let nameUserShort = 'Alejacastanofotografia';
	let nameUserLong = 'Administrador';
	let id = 2020;
	let totalFotos = '1';
	loginDeUusarios.doc(nameUserLong)
	    .set({
			a_name : nameUserLong,
            b_folder : nameUserShort,	
			c_id : id, 
            d_folderTotal : totalFotos,  
            e_fecha_creación : fecha,			
		})
		.then(function(){
			console.log('usuario creado con Id: ' + nameUserLong)
		})
		.catch(function(error){
			console.log(error)
		});
}
var nombreuserLog,	nombreCarpeta, idUsuarios, totalFotografias;  
// login
var cerrar = true;		
function abrirMenuLogin(){
	let menuLogin = document.getElementsByClassName('menuLogin');
	if(cerrar){
		menuLogin[0].style.top = '0';
		cerrar = false;
	}
	else{
		menuLogin[0].style.top = '-150%';
		cerrar = true;
	}
}
let menuGalerias = document.getElementById('navSesiones');
let usuario = document.getElementById('usuario');
let login = document.getElementById('formularioLogin');
let nombreUsuariomenuInner = document.getElementById('nombreUsuariomenu');
let nombreUsuariomenu = document.getElementsByClassName('nombreUsuariomenu');
let	nombreUsuario = document.getElementsByClassName('nameUser');
let documento = document.getElementById('documento');
let documentoUsuario2, documentoUsuario3, nombreArr, nombreUsuario2, usuarioLogin;
login.addEventListener('submit', ValidacionLogin);
function ValidacionLogin(evt){
	evt.preventDefault();
	// var documentoUsuario = document.getElementById('documento').value;
    documentoUsuario2 = documento.value;
    documentoUsuario3 = parseInt(documentoUsuario2);
		mensajeError.style.display = "block";
		mensajeExitoso.style.display = "block";
	//buscando el usuario en Firebase
	db.collection("LoginDeUsuarios").where('c_id', '==', documentoUsuario3)
	.get()
	.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			let datos = doc.data();
			let n = datos.a_name; 
			let nC = datos.b_folder; 
			let id = datos.c_id; 
			let fT = datos.d_folderTotal;
			validarFormulario(n, nC, id, fT);
		});
	})
	.catch(function(error){
		console.log(error)
	});

}	
	
const validarFormulario = (n2, nC2, id2, ft2) => {
			nombre = n2;
			nombreCarpeta = nC2;
			idUsuarios = id2;
			totalFotografias = ft2; 
			usuarioLogin = usuario.value;
			nombreUsuario2 = parseInt(usuarioLogin);
			// mensajes
			var mensajeError = document.getElementById('mensajesFormularioLogin');
			var mensajeExitoso = document.getElementById('mensajeBienvenida');
			var nombreUsuarioTitulo = document.getElementById('nombreUsuarioTitulo');
	
	
	if(documentoUsuario3 === idUsuarios & nombreUsuario2 === idUsuarios & nombreCarpeta  === 'Violeta'){
		nombreArr = [nombreCarpeta, nombre,  totalFotografias];
		loginExitoso(nombreArr);		
	}
	else if(documentoUsuario3 === idUsuarios & nombreUsuario2 === idUsuarios & nombreCarpeta  === 'Alejandra'){
		nombreArr = [nombreCarpeta, nombre,  totalFotografias];		
	    loginExitoso(nombreArr);		
	}
	else if(documentoUsuario3 === idUsuarios & nombreUsuario2 === idUsuarios & nombreCarpeta  === 'Alejacastanofotografia'){
            document.getElementsByClassName('menuLogout')[0].style.display = 'block';
			login.style.display = 'none';
            nombreUsuarioTitulo.innerHTML = 	'Administrador';	
			nombreUsuariomenu[0].style.display = 'flex';
			nombreUsuariomenuInner.innerHTML = 'Administrador';	
            document.getElementById('buttonAdmin').style.display = 'block';			
            document.getElementsByClassName('enlaceDescargar')[0].style.display = 'none';			
	}
	else{
		mensajeError.innerHTML = 'El número de documento ingresado no existe en nuestra base de datos, por favor verificalo o contactanos para más información.' ;
	    mensajeError.style.background = "#ff0000";	
        mensajeError.style.color = "#fff";	
        documento.value = '';	
	}
	  
		// const loginExitoso =  () => {	
		function loginExitoso(nombreArr, mensaje){
		    let userSesion= document.getElementsByClassName('userSesion');
		    for(i = 0 ; i < userSesion.length; i++){
			userSesion[i].click();
			userSesion[i].style.display = 'flex';
		    }				
			for(i = 0; i < nombreUsuario.length; i++){nombreUsuario[i].value = nombreArr[0]}
			menuGalerias.click();
            document.getElementsByClassName('menuLogout')[0].style.display = 'block';
login.style.display = 'none';
			mensajeExitoso.style.display = "none";
	     	mensajeExitoso.style.display = "block";	
	     	mensajeExitoso.innerHTML = `Hola ${nombreArr[0]}, tus fotografías se encuentran publicadas en la pestaña Sesiones/Retratos`;	
            nombreUsuarioTitulo.innerHTML = nombreArr[1];	
			nombreUsuariomenu[0].style.display = 'flex';
			nombreUsuariomenuInner.innerHTML = nombreArr[1];
			
	        document.getElementById('usuariosTotal').value = `${nombreArr[2]}`;
            setTimeout(function(){
abrirMenuLogin();
			mostrarGaleriaUser();
			},500);			
	    }

}

const mostrarGaleriaUser = () => {
	let folderTotal = document.getElementById('usuariosTotal').value;
	let folderName = document.getElementsByClassName('nameUser')[0].value;
	let listaFotosUser = document.getElementById('listaFotosUser');
	// document.getElementById('usuariosTotal').value = `${folderTotal}`;
	document.getElementById('carpetausuarios').value = `Imagenes/Galerias/usuarios/${folderName}`;
	let html = '';
	let html2 = '';
    for(var i = 1; i <= 10; i++){
		
	    const contenedor = `
	            <li>
			        <a href="#" onclick="abrirlight('lightusuarios');document.getElementById('imgusuarios').src = 'Imagenes/Galerias/usuarios/${folderName}/img${i}.jpg'">							
		                <img class="lazyload" data-src="Imagenes/Galerias/usuarios/${folderName}/img${i}.jpg" ><div class="new" ></div>
			        </a>
		        </li>
	    `;
	    html += contenedor;
    }
	listaFotosUser.innerHTML = html;
}

