var add_collapse = function(){
  var previous_whitespace = 0,
  space_count = 4,
  nested_openings = [];

  $('td[id^="LC"').each(function(line_no, line){
    var $line_of_code = $(line),
        $line_row = $line_of_code.parents('tr');
        whitespace_count = $line_of_code.text().replace(/^(\s*).*$/,"$1").length,
        character_count = $line_of_code.text().replace(/ /gi,'').length;

    if(character_count > 1 && whitespace_count == previous_whitespace + space_count){
      nested_openings.push(line_no);
      $line_row.prev().find('td').last().prepend('<a class="gh-collapse-begin" href="#"></a>');
    }

    if(character_count > 1 && whitespace_count == previous_whitespace - space_count){
      var popped_loc = nested_openings.pop(),
          block_start_row = $('td#L'+popped_loc).parents('tr');

      $line_row.addClass('collapse-from-'+popped_loc);
    }

    previous_whitespace = whitespace_count;
  });

  $('a.gh-collapse-begin').on('click', function(e){
    e.preventDefault();
    var parent_tr = $(this).parents('tr'),
        current_line_no = parent_tr.find('td').first().attr('id').replace('L','');

    parent_tr.toggleClass('gh-collapsed');

    if(parent_tr.hasClass('gh-collapsed') == true){
      parent_tr.nextUntil('tr.collapse-from-'+current_line_no).addClass('hidden').removeClass('gh-collapsed');
    }else{
      parent_tr.nextUntil('tr.collapse-from-'+current_line_no).removeClass('hidden');
    }
  });
}

$(document).on('pjax:end', function(){
  add_collapse();
});

add_collapse();
