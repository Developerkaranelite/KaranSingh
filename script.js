const KEY="portfolioProfileV1";
const defaultData={
  name:"Karan", role:"Frontend Developer",
  bio:"I create beautiful, functional and user-centered digital experiences. I turn ideas into clean, modern websites with thoughtful design.",
  aboutTitle:"I build things for the web.",
  aboutText:"I'm a passionate developer focused on creating fast, accessible and visually polished digital experiences. I enjoy learning new technologies and turning creative ideas into real products.",
  experience:"2+", projectsCount:"10+", clientsCount:"5+",
  email:"legitherevr20@gmail.com", phone:"+91 8945987791", location:"India",
  instagramHandle:"@karansingh_1178", image:"karan.jpeg",
  github:"https://github.com/", linkedin:"https://linkedin.com/", instagram:"https://instagram.com/",
  theme:"dark",
  projects:[
    {title:"Portfolio Website",desc:"Modern responsive portfolio with smooth animations and a clean UI.",tags:["HTML","CSS","JS"],image:"",live:"#",github:"#"},
    {title:"Creative Landing Page",desc:"A polished landing page with responsive sections, micro-interactions and strong visual hierarchy.",tags:["HTML","CSS","UI"],image:"",live:"#",github:"#"},
    {title:"Task Manager",desc:"A simple productivity app where users can create, edit, delete and complete tasks.",tags:["HTML","CSS","JS"],image:"",live:"#",github:"#"}
  ]
};
let data=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(defaultData);
let pendingImage=data.image;

function $(id){return document.getElementById(id)}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function setLink(id,url){const a=$(id); if(a){a.href=url||"#"; a.style.display=url?"":"none"}}
function applyData(){
  document.title=data.name+" — Portfolio";
  $("brandName").textContent=data.name; $("heroName").textContent=data.name; $("footerName").textContent=data.name; $("footerName2").textContent=data.name;
  $("heroRole").textContent=data.role; $("heroBio").textContent=data.bio;
  $("aboutTitle").textContent=data.aboutTitle; $("aboutText").textContent=data.aboutText;
  $("experience").textContent=data.experience; $("projectsCount").textContent=data.projectsCount; $("clientsCount").textContent=data.clientsCount;
  $("profileImage").src=data.image; $("editorPreview").src=data.image;
  $("emailLink").href="mailto:"+data.email; $("emailLink").querySelector("span").textContent=data.email;
  $("phoneLink").href="tel:"+data.phone.replace(/\s/g,""); $("phoneLink").querySelector("span").textContent=data.phone;
  $("locationText").textContent=data.location;
  $("instagramHandle").textContent=data.instagramHandle;
  setLink("githubTop",data.github); setLink("linkedinTop",data.linkedin); setLink("instagramTop",data.instagram);
  setLink("githubContact",data.github); setLink("linkedinContact",data.linkedin); setLink("instagramContact",data.instagram);
  setLink("instagramHero",data.instagram);
  document.body.classList.toggle("light",data.theme==="light");
  $("themeToggle").textContent=data.theme==="light"?"☀":"☾";
  renderProjects();
  $("year").textContent=new Date().getFullYear();
}
function renderProjects(){
  $("projectsGrid").innerHTML=data.projects.map((p,i)=>{
    const img=p.image||"assets/project-placeholder.svg";
    return `<article class="project-card reveal show">
      <div class="project-image"><img src="${esc(img)}" alt="${esc(p.title)}"></div>
      <div class="project-body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
      <div class="project-links"><a href="${esc(p.live||"#")}" target="_blank" rel="noopener">Live Demo ↗</a><a href="${esc(p.github||"#")}" target="_blank" rel="noopener">GitHub ↗</a></div></div>
    </article>`
  }).join("");
}
function fillEditor(){
  $("editName").value=data.name;$("editRole").value=data.role;$("editBio").value=data.bio;
  $("editAboutTitle").value=data.aboutTitle;$("editAboutText").value=data.aboutText;
  $("editExperience").value=data.experience;$("editProjectsCount").value=data.projectsCount;$("editClientsCount").value=data.clientsCount;
  $("editEmail").value=data.email;$("editPhone").value=data.phone;$("editLocation").value=data.location;$("editInstagramHandle").value=data.instagramHandle;
  $("editGithub").value=data.github;$("editLinkedin").value=data.linkedin;$("editInstagram").value=data.instagram;
  $("editorPreview").src=data.image; pendingImage=data.image;
  renderProjectEditor();
}
function renderProjectEditor(){
  $("projectEditorList").innerHTML=data.projects.map((p,i)=>`
    <div class="editor-project">
      <div class="editor-project-head"><b>Project ${i+1}</b><button class="remove-project" data-remove="${i}">Remove</button></div>
      <label>Title<input data-p="${i}" data-k="title" value="${esc(p.title)}"></label>
      <label>Description<textarea data-p="${i}" data-k="desc" rows="2">${esc(p.desc)}</textarea></label>
      <label>Tags <small>(comma separated)</small><input data-p="${i}" data-k="tags" value="${esc(p.tags.join(", "))}"></label>
      <div class="two-col">
        <label>Live URL<input data-p="${i}" data-k="live" value="${esc(p.live||"")}></label>
        <label>GitHub URL<input data-p="${i}" data-k="github" value="${esc(p.github||"")}></label>
      </div>
      <label>Project image URL <small>Optional</small><input data-p="${i}" data-k="image" value="${esc(p.image||"")}"></label>
    </div>`).join("");
  $("projectEditorList").querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{data.projects.splice(+b.dataset.remove,1);renderProjectEditor()});
}
function collectEditor(){
  data.name=$("editName").value.trim()||"My Name";data.role=$("editRole").value.trim()||"Frontend Developer";
  data.bio=$("editBio").value.trim();data.aboutTitle=$("editAboutTitle").value.trim();data.aboutText=$("editAboutText").value.trim();
  data.experience=$("editExperience").value.trim();data.projectsCount=$("editProjectsCount").value.trim();data.clientsCount=$("editClientsCount").value.trim();
  data.email=$("editEmail").value.trim();data.phone=$("editPhone").value.trim();data.location=$("editLocation").value.trim();data.instagramHandle=$("editInstagramHandle").value.trim();
  data.github=$("editGithub").value.trim();data.linkedin=$("editLinkedin").value.trim();data.instagram=$("editInstagram").value.trim();data.image=pendingImage;
  document.querySelectorAll("#projectEditorList [data-p]").forEach(el=>{
    const i=+el.dataset.p,k=el.dataset.k;data.projects[i][k]=k==="tags"?el.value.split(",").map(x=>x.trim()).filter(Boolean):el.value.trim();
  });
}
function save(){
  collectEditor();
  try{
    localStorage.setItem(KEY,JSON.stringify(data));
    applyData();
    closeEditor();
  }catch(err){
    console.error(err);
    alert("Changes could not be saved. Please use a smaller image and try again.");
  }
}
function openEditor(){fillEditor();$("editorOverlay").classList.add("open");document.body.style.overflow="hidden"}
function closeEditor(){$("editorOverlay").classList.remove("open");document.body.style.overflow=""}
$("editOpen").onclick=openEditor;$("editOpenFooter").onclick=openEditor;$("editorClose").onclick=closeEditor;
$("editorOverlay").addEventListener("click",e=>{if(e.target===$("editorOverlay"))closeEditor()});
$("saveData").onclick=save;
$("resetData").onclick=()=>{if(confirm("Reset all website details to the default demo content?")){data=structuredClone(defaultData);pendingImage=data.image;localStorage.removeItem(KEY);applyData();fillEditor()}};
$("imageUpload").onchange=e=>{
  const file=e.target.files?.[0];
  if(!file)return;
  if(!file.type.startsWith("image/")){
    alert("Please select an image file.");
    e.target.value="";
    return;
  }
  const reader=new FileReader();
  reader.onload=()=>{
    const img=new Image();
    img.onload=()=>{
      const maxSize=900;
      const scale=Math.min(1,maxSize/Math.max(img.width,img.height));
      const canvas=document.createElement("canvas");
      canvas.width=Math.max(1,Math.round(img.width*scale));
      canvas.height=Math.max(1,Math.round(img.height*scale));
      const ctx=canvas.getContext("2d");
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      pendingImage=canvas.toDataURL("image/jpeg",0.86);
      $("editorPreview").src=pendingImage;
    };
    img.onerror=()=>alert("The selected image could not be loaded.");
    img.src=reader.result;
  };
  reader.onerror=()=>alert("Could not read the selected image.");
  reader.readAsDataURL(file);
};
$("addProject").onclick=()=>{data.projects.push({title:"New Project",desc:"Describe your project here.",tags:["HTML","CSS","JS"],image:"",live:"#",github:"#"});renderProjectEditor()};
$("themeToggle").onclick=()=>{data.theme=data.theme==="light"?"dark":"light";applyData()};
$("editorThemeToggle").onclick=()=>{data.theme=data.theme==="light"?"dark":"light";document.body.classList.toggle("light",data.theme==="light")};
document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{document.querySelectorAll(".tab,.tab-content").forEach(x=>x.classList.remove("active"));tab.classList.add("active");$(tab.dataset.tab).classList.add("active")});
$("contactForm").onsubmit=e=>{e.preventDefault();const subject=encodeURIComponent("Portfolio contact from "+$("senderName").value);const body=encodeURIComponent($("senderMessage").value+"\n\nReply to: "+$("senderEmail").value);window.location.href=`mailto:${data.email}?subject=${subject}&body=${body}`;$("formStatus").textContent="Opening your email app…"};
$("menuBtn").onclick=()=>document.querySelector(".site-header").classList.toggle("mobile-open");
document.querySelectorAll(".nav-link").forEach(a=>a.onclick=()=>document.querySelector(".site-header").classList.remove("mobile-open"));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
const sections=[...document.querySelectorAll("main section")],links=[...document.querySelectorAll(".nav-link")];
window.addEventListener("scroll",()=>{let current="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current))});
applyData();
