with params(param) as (
    values ($1), ($2)
),

pairs(i_id, u_id) as (
    select i_id, u_id
    from (
        select
            array_agg(param order by user_id) as i_arr,
            array_agg(user_id order by user_id desc) as u_arr
        from items
        join params on param = id
    ) s,
    unnest(i_arr, u_arr) as u(i_id, u_id)
)

update items
set user_id = u_id
from pairs
where id = i_id;
