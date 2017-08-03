import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(value: any[], field: string): any[] {
        if (value && field) {
            const groupedObj = value.reduce((prev, cur) => {
                var agrupacion = field.split(".");
                if (agrupacion.length <= 1) {
                    if (!prev[cur[field]]) {
                        prev[cur[field]] = [cur];
                    } else {
                        prev[cur[field]].push(cur);
                    }
                }
                else {
                    if (!prev[cur[agrupacion[0]][agrupacion[1]]]) {
                        prev[cur[agrupacion[0]][agrupacion[1]]] = [cur];
                    } else {
                        prev[cur[agrupacion[0]][agrupacion[1]]].push(cur);
                    }
                }
                return prev;
            }, {});
            return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        }
        else
            return value;
    }
}