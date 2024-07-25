window.onload=function (){
    const gallery=document.querySelector(".gallery");
    const previewImage=document.querySelector(".preview-img img");

    document.addEventListener("mouseleave",function(event){
        const x=event.clientX;
        const y=event.clientY;
        
        const centerX=window.innerWidth /2;
        const centerY=window.innerHeight /2;

        const percentX=(x-centerX) /centerX;
        const percentY=(y-centerY) /centerY;

        const rotateX=55+ percentY*2;
        const rotateY=percentX*2;

        gsap.to(gallery,{
            duration:1,
            ease:"power2.out",
            rotateX:rotateX,
            rotateY:rotateY,
            overwrite:"auto",

        });
    });
    for (let i = 0; i < 80; i++) {
        const item = document.createElement("div");
        item.className="item";
        const img=document.createElement("img");
        img.src="./assets/img"+((i%10)+1)+".jpg";
        item.appendChild(img);
        gallery.appendChild(item);    
    }

    const items=document.querySelectorAll(".item");
    const numberOfItem=items.length;
    const angleIncrement=360/numberOfItem;

    items.forEach((items,index)=>{
        gsap.set(items,{
            rotationY:90,
            rotationZ:index*angleIncrement-90,
            transformOrigin:"50% 400px",
        });

        items.addEventListener("mouseover",function(){
            const imgInsideItem=items.querySelector("img");
            previewImage.src=imgInsideItem.src;


            gsap.to(items,{
                x:10,
                z:10,
                y:10,
                ease:"power2.out",
                duration:0.5,
            });
        });
        items.addEventListener("mouseout",function(){
            previewImage.src="./assets/img1.jpg";
            gsap.to(items,{
                x:0,
                y:0,
                z:0,
                ease:"power2.out",
                duration:0.5,
            });
        });
    });

    ScrollTrigger.cretae({
        trigger:"body",
        start:"top top",
        end:"bottom bottom",
        scrub:2,
        onRefresh:setupRotation,
        onUpdate:(self) =>{
            const rotationProgress=self.progress*360*1;
            items.forEach((item,index)=>{
                const currentAngle=index * angleIncrement -90 + rotationProgress;
                gsap.to(item,{
                    rotationZ:currentAngle,
                    duration:1,
                    ease:"power3.out",
                    overwrite:"auto",
                });
            });
        },
    });  
};


function setupRotation(){}