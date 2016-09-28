(function() {

        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        window.params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
           
            $.ajax({
                url: 'https://api.spotify.com/v1/users/1114819007/playlists/6mvEBsZ5pjxWn7PhAytNYQ/tracks',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  console.log(response)

                  function update () {
                    $('.artist').html(trackDetails[track].artist);
                    $('.track').html(trackDetails[track].trackName);
                    $(".track-image img").attr('src', artWork[track]);
                    $('.number').html('0' + ([track + 1]));
                  }

                  var tracks = [],
                    trackDetails = [],
                    artWork = [],
                    track = 0;

                  for(var i = 0; i < 9; i++) {
                    tracks.push(response.items[i].track.preview_url);
                    trackDetails.push({trackName: response.items[i].track.name, artist: response.items[i].track.artists[0].name});
                    artWork.push(response.items[i].track.album.images[0].url);
                  }

                  $(".track-image").append('<img src="'+ artWork[track] +'"></img>');
                  $('.artist').html(trackDetails[track].artist);
                  $('.track').html(trackDetails[track].trackName);
                  $('.number').html('0' + ([track + 1]));

                  var audio = new Audio();
                  var playing = false;

                  $('.play').click(function(){
                    playing = true;
                    audio.src = tracks[track];
                    audio.play();
                    $(this).css('display', 'none');
                    $('.pause').fadeIn('slow');
                  });

                  $('.pause').click(function(){
                    playing = false;
                    audio.pause();
                    $(this).css('display', 'none');
                    $('.play').fadeIn('slow');
                  });

                  $('.next').click(function(){
                    
                      $('.play').css('display', 'none');
                      $('.pause').fadeIn('slow');
                    
                    if(track === (tracks.length - 1)) {
                      track = 0;
                      audio.src = tracks[track];
                      audio.play();
                      update();
                    }else {
                      track++;
                      audio.src = tracks[track];
                      audio.play();
                      update();
                    }
                  });



                  $('#login').hide();
                  $('#loggedin').show();
                }
            });
          } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }
        }
      })();