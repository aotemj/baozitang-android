$(function () {
    //点击返回按钮
    $('.back').on('click', function () {
        window.baozitang.close();
    });

    //动态设置历史作业高度
    // var liLength = $('.history-home li').length;
    // var liHeight = $('.history-home li').height();
    // // console.log(liLength);
    // // console.log(liHeight);
    // var ulHeight = liLength*liHeight+800;
    // // console.log(ulHeight);
    // $('.history-home').height(ulHeight/75+'rem');


    //获取学习记录
    getLearnRecord(
        {
            'studentId': 5
        },
        function (res) {
            //获取页面高度
            var bodyHeight = screen.height;
            console.log(bodyHeight);
            // alert(bodyHeight);
            $('.container').height(bodyHeight + '/75rem');
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                var data = res.data[i];
                $('.history-home').append(
                    '<li>'
                    + '	<a href="#">'
                    + '		<div class="content">'
                    + '			<div class="time">'
                    + '				<span>' + timeFilter(data.modiTime) + '</span>'
                    + '			</div>'
                    + '			<div class="homework-desc">'
                    + '				<div>'
                    + '					<h4>' + data.title + '</h4>'
                    + '					<p><span>' + data.author + '</span> | 时长<span>' + data.timeLength + '</span></p>'
                    + '				</div>'
                    + '			</div>'
                    + '		</div>'
                    + '	</a>'
                    + '</li>'
                );
            }
        });
});
