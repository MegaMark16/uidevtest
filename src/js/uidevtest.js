
$(document).ready(init);

var story_id;

function init() {
    if (window.location.search.indexOf('?story=') > -1) {
        story_id = window.location.search.split('story=')[1];
    }
    $.getJSON('../js/uidevtest-data.js', process_stories);
}

function process_stories(data, response_status) {
    for (index in data.objects) {
        var story = data.objects[index];
        story.index = index+1;
        var path = data.objects[index].url_path.split('/');
        var id = path[path.length-2];
        story.id = id;
        story.pub_date_formatted = get_pub_date_formatted;
        story.updated_formatted = get_updated_formatted;
    }
    if (story_id) {
        story = [];
        $(data.objects).each(function(index, item) { 
                if (item.id == story_id) { 
                    story.push(item);
                }
            });
        if (story.length) {
            render_story(story[0]);
        }
    }
    else {
        render_story_list(data);
    }
}

function get_pub_date_formatted() {
    var date_string = Date.parse(this.pub_date.replace('-07:00', ''));
    return date_string.toString('h:mm tt dddd, MMM. dd, yyyy');
}

function get_updated_formatted() {
    var date_string = Date.parse(this.updated.replace('-07:00', ''));
    return date_string.toString('h:mm tt dddd, MMM. dd, yyyy');
}

function render_story(story) {
    var story_template = $('.news_story_template').val();
    var output = Mustache.render(story_template, story);
    $('.content').html(output);
}

function render_story_list(stories) {
    var story_template = $('.news_story_list_template').val();
    var output = Mustache.render(story_template, stories);
    $('.content').html(output);
}

