var function_code = "var add_collapse = function(){\r\n  var previous_whitespace = 0,\r\n  space_count = 4,\r\n  nested_openings = [];\r\n\r\n  $(\'td[id^=\"LC\"\').each(function(line_no, line){\r\n    var $line_of_code = $(line),\r\n        $line_row = $line_of_code.parents(\'tr\');\r\n        whitespace_count = $line_of_code.text().replace(\/^(\\s*).*$\/,\"$1\").length,\r\n        character_count = $line_of_code.text().replace(\/ \/gi,\'\').length;\r\n\r\n    if(character_count > 1 && whitespace_count == previous_whitespace + space_count){\r\n      nested_openings.push(line_no);\r\n      $line_row.prev().find(\'td\').last().prepend(\'<a class=\"gh-collapse-begin\" href=\"#\"><\/a>\');\r\n    }\r\n\r\n    if(character_count > 1 && whitespace_count == previous_whitespace - space_count){\r\n      var popped_loc = nested_openings.pop(),\r\n          block_start_row = $(\'td#L\'+popped_loc).parents(\'tr\');\r\n\r\n      $line_row.addClass(\'collapse-from-\'+popped_loc);\r\n    }\r\n\r\n    previous_whitespace = whitespace_count;\r\n  });\r\n\r\n  $(\'a.gh-collapse-begin\').on(\'click\', function(e){\r\n    e.preventDefault();\r\n    var parent_tr = $(this).parents(\'tr\'),\r\n        current_line_no = parent_tr.find(\'td\').first().attr(\'id\').replace(\'L\',\'\');\r\n\r\n    parent_tr.toggleClass(\'gh-collapsed\');\r\n\r\n    if(parent_tr.hasClass(\'gh-collapsed\') == true){\r\n      parent_tr.nextUntil(\'tr.collapse-from-\'+current_line_no).addClass(\'hidden\').removeClass(\'gh-collapsed\');\r\n    }else{\r\n      parent_tr.nextUntil(\'tr.collapse-from-\'+current_line_no).removeClass(\'hidden\');\r\n    }\r\n  });\r\n}\r\n\r\n$(document).on(\'pjax:end\', function(){\r\n  add_collapse();\r\n});\r\n\r\nadd_collapse();\r\n"
var s = document.createElement('script');
s.type = "text/javascript";
s.innerHTML = function_code;
(document.head || document.documentElement).appendChild(s);
