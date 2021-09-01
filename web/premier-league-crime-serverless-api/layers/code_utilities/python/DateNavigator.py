from datetime import datetime
from typing import List

class DateNavigator:

    # date_range_start, date_range_end -> str (YYYY_MM_DD)
    def get_list_of_date_query_strings_for_last_year() -> List[str]:
        return ['2021-08','2021-07','2021-06','2021-05','2021-04','2021-03','2021-02','2021-01','2020-12','2020-11','2020-10','2020-09']
    