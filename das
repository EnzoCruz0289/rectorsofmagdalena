[1mdiff --git a/.firebase/hosting.ZGlzdFxzZWRcYnJvd3Nlcg.cache b/.firebase/hosting.ZGlzdFxzZWRcYnJvd3Nlcg.cache[m
[1mindex a3ac3de..6f610a9 100644[m
[1m--- a/.firebase/hosting.ZGlzdFxzZWRcYnJvd3Nlcg.cache[m
[1m+++ b/.firebase/hosting.ZGlzdFxzZWRcYnJvd3Nlcg.cache[m
[36m@@ -1,13 +1,13 @@[m
[31m-polyfills-FFHMD2TL.js,1756516218576,736494ba509ebe13a13ff57f0d4921ecfd9eb2ac4e8efe5d5fc1704b4b1d9b35[m
[31m-chunk-BI7C37SH.js,1756516218576,bd285f8d16046048e1602c91ade317cbaebabb92762bf1bb0801661872c9df3c[m
[31m-chunk-4TC6NHXT.js,1756516218576,fee393f92a2246a2726fd2ec24464957f30a3a03f59d40febad595c066b43cfa[m
[31m-chunk-3TPSIUFX.js,1756516218576,82b520963ed45bbc2e17524739920a29870262fd64c572bb5056ea222d623f4c[m
[31m-scripts-AYGRPO7R.js,1756516218576,81d9c76c50302824c891544e3b737a93282f87fe1d27181eaa73e1102053cd71[m
[31m-favicon.ico,1754540062904,8f40b10c5b99025c7e0c6f99db9518677c4e6104e8e920984867374c735b58ed[m
[31m-index.html,1756516218575,81547a9f5bd5d3b6c01cbf6c502fc1a3108d2fb64a6ae97faf3a00d33db8260c[m
[31m-chunk-A52LFRZP.js,1756516218575,7516bdaca1fc956a2afe4dcdda4e520a07207db66ac57f6c451e9d17d160b2dd[m
[31m-styles-JHURU2IJ.css,1756516218576,8cc1ffccb450829577e7dec7f87073ce68a59d1b242e789db3d25b330f63eef7[m
[31m-chunk-UP7WY5RK.js,1756516218576,1d18bb17b339906a9ef196fe76278f609ac476c62595146793ac8b5c995b8661[m
[31m-logosed.png,1754540062909,c767fa877138f23239661f9062e12bb6bb02cb330bec1f5cbecc09cfd0028691[m
[31m-assets/logosed.png,1754540062933,c767fa877138f23239661f9062e12bb6bb02cb330bec1f5cbecc09cfd0028691[m
[31m-main-IUIX7WLT.js,1756516218577,82decb1dca3b249caed27407ffdd05fcf224eb1a238f7ab985177a2965d82594[m
[32m+[m[32mpolyfills-FFHMD2TL.js,1756408191703,736494ba509ebe13a13ff57f0d4921ecfd9eb2ac4e8efe5d5fc1704b4b1d9b35[m
[32m+[m[32mchunk-BI7C37SH.js,1756408191655,bd285f8d16046048e1602c91ade317cbaebabb92762bf1bb0801661872c9df3c[m
[32m+[m[32mchunk-4TC6NHXT.js,1756408191647,fee393f92a2246a2726fd2ec24464957f30a3a03f59d40febad595c066b43cfa[m
[32m+[m[32mchunk-3TPSIUFX.js,1756408191621,82b520963ed45bbc2e17524739920a29870262fd64c572bb5056ea222d623f4c[m
[32m+[m[32mscripts-AYGRPO7R.js,1756408191712,81d9c76c50302824c891544e3b737a93282f87fe1d27181eaa73e1102053cd71[m
[32m+[m[32mindex.html,1756408191596,4927743db0719c482c95fe58b973ea688b35def6d8e1e2b2520b6ad692407031[m
[32m+[m[32mfavicon.ico,1756157040666,8f40b10c5b99025c7e0c6f99db9518677c4e6104e8e920984867374c735b58ed[m
[32m+[m[32mchunk-A52LFRZP.js,1756408191654,7516bdaca1fc956a2afe4dcdda4e520a07207db66ac57f6c451e9d17d160b2dd[m
[32m+[m[32mstyles-JHURU2IJ.css,1756408191673,8cc1ffccb450829577e7dec7f87073ce68a59d1b242e789db3d25b330f63eef7[m
[32m+[m[32mchunk-UP7WY5RK.js,1756408191727,1d18bb17b339906a9ef196fe76278f609ac476c62595146793ac8b5c995b8661[m
[32m+[m[32massets/logosed.png,1756157040699,c767fa877138f23239661f9062e12bb6bb02cb330bec1f5cbecc09cfd0028691[m
[32m+[m[32mlogosed.png,1756157040668,c767fa877138f23239661f9062e12bb6bb02cb330bec1f5cbecc09cfd0028691[m
[32m+[m[32mmain-CURH7O5J.js,1756408192012,a8bb1d34501d36f30424d1d357c59af508962840270bb8905c3767ab88619eb6[m
[1mdiff --git a/src/app/pagges/datased/datased.component.html b/src/app/pagges/datased/datased.component.html[m
[1mindex 24a5bbf..ffa5aba 100644[m
[1m--- a/src/app/pagges/datased/datased.component.html[m
[1m+++ b/src/app/pagges/datased/datased.component.html[m
[36m@@ -95,7 +95,157 @@[m
 [m
         <div class="col-12 col-sm-6 col-md-4 ">[m
           <b class="form-group-label">INSTITUCION EDUCATIVA</b>[m
[31m-          <input class="form-control" formControlName="ied" type="text">[m
[32m+[m[32m          <select class="form-control" formControlName="ied" type="text">[m
[32m+[m[32m            <option value="" disabled selected>Seleccione una opción</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ELVIA VIZCAINO DE TODARO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL GABRIEL GARCIA MARQUEZ DE ARACATACA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JOHN F. KENNEDY</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL FOSSY MARCOS MARIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LICEO ARIGUANI</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE BASICA Y MEDIA SAN ANTONIO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL LICEO SANTANDER</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL SAN JUDAS TADEO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LORENCITA VILLEGAS DE SANTOS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JOSE BENITO BARROS PALOMINO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SANTA TERESA DE JESUS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ARCESIO CALIZ AMADOR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGRICOLA DEL PIÑON</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL EUCLIDES LIZARAZO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TERCERA MIXTA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL FRANCISCO DE PAULA SANTANDER</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL 23 DE FEBRERO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL FUNDACION</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL NUESTRA SEÑORA DEL CARMEN</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL BIENVENIDO RODRIGUEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL NESTOR RANGEL ALFARO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL PIJIÑO DEL CARMEN</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAGRADO CORAZON DE JESUS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LICEO PIVIJAY</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGROPECUARIA JOSE MARIA HERRERA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL MARIA ALFARO DE OSPINO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL VICTOR CAMARGO ALVAREZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL JUANA ARIAS DE BENAVIDES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICO DEPARTAMENTAL GABRIEL ESCOBAR BALLESTAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAN JOSE DE PUEBLO VIEJO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JUAN MANUEL RUDAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE SALAMINA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL EXTERNADO MIXTO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ALFONSO LOPEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ANTONIO BRUJES CARMONA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL MARIA AUXILIADORA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SANTA MARIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL RAFAEL JIMENEZ ALTAHONA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TÉCNICA DEPARTAMENTAL SAN JOSE</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICO DEPARTAMENTAL SIMON BOLIVAR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE BUENOS AIRES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAN JUAN  BAUTISTA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ETNOEDUCATIVO Y PLURICULTURAL GUMMAKU</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LA CANDELARIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TECNICA AGROPECUARIA CARMEN DE ARIGUANI</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TECNICA AGROPECUARIA BENJAMIN HERRERA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL MANUEL SALVADOR MEZA CAMARGO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LUZ MARINA CABALLERO</option>[m
[32m+[m[32m            <option>CENTRO EDUCATIVO DEPARTAMENTAL SAN ANTONIO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE BASICA Y MEDIA DE CONCORDIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JOSEFA MARIA ROMERO DE LA CRUZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SANTA ROSA DE LIMA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TECNICA FRANCISCO JOSE DE CALDAS</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL DE SOPLADOR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LAS MERCEDES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CERRO BLANCO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CIUDAD PERDIDA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ARMANDO ESTRADA FLOREZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RODRIGO VIVES DE ANDREIS</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL HUMBERTO VELAZQUEZ GARCIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL THELMA ROSA AREVALO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ETNOEDUCATIVA SANTA ROSALIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAN JOSE DE KENNEDY</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL RURAL GUILLERMO ALVAREZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL RITA CUELLO DE VANEGAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ELECTO CALIZ MARTINEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SILVIA COTES DE BISWELL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL OSCAR PISCIOTTI NUMA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL ENRIQUE QUINTERO JAIMES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL PABLO NIEBLES DE GUAYABAL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ANAXIMENES TORRES OSPINO</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL MITSILOU CAMPBELL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL GILBERTO ACUÑA RANGEL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JOSE DE LA PAZ VANEGAS ORTIZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ROBERTO ROBLES DE ALGARROBAL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE CARRETO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL CANTAGALLAR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SABANAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ROQUE DE LOS RIOS VALLE</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SIERRA NEVADA DE SANTA MARTA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ALGARROBO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LOMA DEL BALSAMO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RAFAEL NUÑEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGOPECUARIA JUAN FRANCISCO OSPINA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA INDIGENA Y PLURICULTURAL KANKAWARWA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SAGRADO CORAZON DE JESUS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL LA RINCONADA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL MARIA AUXILIADORA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SAN PEDRO APOSTOL LAS FLORES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE RICAURTE</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL NICOLAS MEJIA MENDEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL PESTALOZZI</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CAÑO DE AGUAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE BOMBA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LICEO ZAPAYAN</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL PEDRO DE HEREDIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAN PABLO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE BASICA Y MEDIA SANTA CRUZ DE BALSAMO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TECNICA AGROECOLOGICA JOSE DADUL</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL AGROAMBIENTAL SAN JOSE</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL EL BRILLANTE</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL FLORES DE MARIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE MEDIA LUNA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGROPECUARIA NUESTRA SEÑORA DE LAS MERCEDES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ALBERTO CABALLERO DE MONTE RUBIO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGROPECUARIA OTILIA MENA ALVAREZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SAN MARTIN DE LOBA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL LUIS CARLOS GALAN SARMIENTO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL AGROPECUARIA URBANO MOLINA CASTRO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TECNICA NUEVA GRANADA</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL AGROPECUARIA ROSA CORTINA HERNANDEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE PALMIRA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL TASAJERA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE NIÑAS ISLA DEL ROSARIO</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL RURAL SAN JUAN DE PALOS PRIETOS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL  BALDOMERO SANIN CANO</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL ETTE ENNAKA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ANDRES DIAZ VENERO DE LEIVA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL LUIS MILLAN VARGAS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE LA PACHA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL SAN VALENTIN</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DE TRONCOSO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE JANEIRO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL JOSE DE LA LUZ MARTINEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL GERARDO VALENCIA CANO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL EL HORNO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICO DEPARTAMENTAL DE CABRERA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CELINDA MEJIA LOPEZ</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL NUESTRA SEÑORA DEL ROSARIO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SAN JOSE DE SAN FERNANDO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL DE GERMANIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CIENAGUETA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TECNICA DEPARTAMENTAL DE PINTO GILMA ROYERO SOLANO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL RURAL DE PALERMO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL ANUAR RIVERA JATTAR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SANTA INES</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL REAL DEL OBISPO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL DAGOBERTO OROZCO BORJA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL CANDELARIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA ETNOEDUCATIVA DEPARTAMENTAL TUCURINCA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL SIMON BOLIVAR</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL COLOMBIA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL MARIA INMACULADA</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA TÉCNICA DEPARTAMENTAL DE GUAIMARO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA ETNOEDUCATIVA  DEPARTAMENTAL MACONDO</option>[m
[32m+[m[32m            <option>INSTITUCION ETNOEDUCATIVA DEPARTAMENTAL JOSE BENITO VIVES DE ANDREIS</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL TOMAS HERRERA CANTILLO</option>[m
[32m+[m[32m            <option>INSTITUCION EDUCATIVA DEPARTAMENTAL EL CONSUELO</option>[m
[32m+[m[32m          </select>[m
         </div>[m
 [m
         <div class="col-12 col-sm-6 col-md-4 my-1">[m
[1mdiff --git a/src/app/pagges/datased/datased.component.ts b/src/app/pagges/datased/datased.component.ts[m
[1mindex 53b1c0b..c2975aa 100644[m
[1m--- a/src/app/pagges/datased/datased.component.ts[m
[1m+++ b/src/app/pagges/datased/datased.component.ts[m
[36m@@ -266,7 +266,6 @@[m [mlimpiarInputsArchivo() {[m
 [m
     const formData = this.myForm.getRawValue(); // ✅ CAMBIADO AQUÍ[m
     const observation = formData.tipoTramiteDocente?.toLowerCase();[m
[31m-    const observationRemplazo = formData.tipoTramiteRemplazo?.toLowerCase();[m
     const cedula = String(formData.cedulaDocente).trim();[m
     const fecha = new Date().toISOString();  // para fecha de subida[m
     let fechaa = new Date();[m
[36m@@ -358,18 +357,21 @@[m [mlimpiarInputsArchivo() {[m
       let cedulaRemplazo = this.myForm.value.cedulaRemplazo || null;[m
       let tipoTramiteRemplazo = this.myForm.value.tipoTramiteRemplazo || null;[m
 [m
[31m-   if (observationRemplazo === 'prorroga') {[m
[32m+[m[32m      if (observation === 'prorroga') {[m
   const ultimo = await this.firebase.obtenerUltimaIncapacidadPorCedula(cedula); [m
   if (ultimo) {[m
     nombreRemplazo = ultimo['nombreRemplazo'] ?? nombreRemplazo;[m
     cedulaRemplazo = ultimo['cedulaRemplazo'] ?? cedulaRemplazo;[m
[31m-    tipoTramiteRemplazo = 'prorroga'; // 👈 acá sí corresponde[m
[32m+[m[32m    formData.tipoTramiteRemplazo = 'Prorroga';[m
[32m+[m
[32m+[m
[32m+[m[32m  }else if (observation === 'primera vez') {[m
[32m+[m[32m    // 🔹 Asegurar que se guarde lo NUEVO[m
[32m+[m[32m    nombreRemplazo = this.myForm.value.nombreRemplazo || null;[m
[32m+[m[32m    cedulaRemplazo = this.myForm.value.cedulaRemplazo || null;[m
[32m+[m[32m    formData.tipoTramiteRemplazo = 'Primera vez';[m
[32m+[m
   }[m
[31m-} else {[m
[31m-  // 🔹 Caso "Primera vez"[m
[31m-  nombreRemplazo = this.myForm.value.nombreRemplazo || null;[m
[31m-  cedulaRemplazo = this.myForm.value.cedulaRemplazo || null;[m
[31m-  tipoTramiteRemplazo = 'primera vez'; // 👈 acá también[m
 }[m
 [m
 [m
