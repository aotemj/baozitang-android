$(function(){
	var t = {
		playlist:[
			{
			  file: "tracks/jq22com1.mp3",
			  thumb: "thumbs/01.jpg",
			  trackName: "第四章 如何发挥人的长处如何发挥人的长处如何发挥人的长处",
			  trackArtist: "4-2 如何管理上司(1)",
			  trackAlbum: "Single",
			},
			{
			  file: "tracks/jq22com2.mp3",
			  thumb: "thumbs/02.jpg",
			  trackName: "Blank",
			  trackArtist: "Disfigure",
			  trackAlbum: "Single",
			},
			{
			  file: "tracks/jq22com3.mp3",
			  thumb: "thumbs/03.jpg",
			  trackName: "Fade",
			  trackArtist: "Alan Walker",
			  trackAlbum: "Single",
			}
		],
		autoPlay:true
	}

	$(".jAudio--player").jAudio(t);

	//底部导航：
	$('.footer ul li').on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
})
