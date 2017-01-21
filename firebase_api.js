var config = {
    apiKey: "AIzaSyApM3GsC4QC0TbQpcg3862GO98bN694XVE",
    authDomain: "ministok-eebfa.firebaseapp.com",
    databaseURL: "https://ministok-eebfa.firebaseio.com",
    storageBucket: "ministok-eebfa.appspot.com",
    messagingSenderId: "422588779144"
  };
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();			
var data,l,i=0,j=0,sonid;
var v=[];

function add(veri,sonid,kat)
{
	var veriref=database.ref(kat+'/'+sonid).set(veri);
}
function del(id,kat)
{
	var veridel=database.ref(kat).child(id).remove();
	$("select[name='urun'] option[value='"+id+"']").remove();
	temizle();
}
function temizle()
{
	$("input[name='ad']").val('');
	$("input[name='fiyat']").val('');
}
function temizle_liste()
{
	$("select[name='urun']").html('');
	$("select[name='urun']").append('<option value="-1" selected>-</option>');
	$("select[name='kullanici']").html('');
	$("select[name='kullanici']").append('<option value="-1" selected>-</option>');
	$("select[name='mekan']").html('');
	$("select[name='mekan']").append('<option value="-1" selected>-</option>');
}
function liste(kat)
{
	temizle_liste();
	temizle();
	v[kat]=[];
	var ref=database.ref(kat);
	ref.on("value", function(snapshot) {
		v[kat]=snapshot.val();
		if(v[kat]!=null)
		{
			j=Object.keys(v[kat]);					
			sonid=j.length+1;		
			var m=0;
			for(var k=0;k<j.length;k++)
			{					
				l=j[m];
				$("select[name='"+kat+"']").append($('<option>', { 
					value: l,
					text : v[kat][l]['ad'] 
				}));
				m++;
			}
		}
		else
			sonid=0;
	});
}		
