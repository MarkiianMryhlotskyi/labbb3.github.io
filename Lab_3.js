const Max = (array) => Math.max(...array);
const max_index = (array) => array.reduce((acc, cur, index) => (cur === Max(array) ? [...acc, index] : acc), []);

const has_absolute_win = (candidate) => candidate > ((sum(votes) / 2) + 1);

const grade = (num, size) => size - num - 1;

const candidates = [
    [1, 1, 3, 2, 3],
    [2, 3, 2, 3, 1],
    [3, 2, 1, 1, 2]
];

const votes = [24, 23, 26, 20, 16];


const candidates_num = 3;



function show_results() {
    console.log("Назва правила | Переможець");
    console.log("___________________________________________________");

    //process.stdout.write("Борда|");
    //show_solutions(borda(candidates));

    process.stdout.write("Кондорсе|");
    show_solutions(condorse(candidates));

}
show_results();
function show_solutions(array) {

    array.forEach((elem, i) => {
        if (i == 0)
            process.stdout.write("С");
    });

    console.log();
    console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
}

function second_tour_winner(first_tour_results) {
    let winner = max_index(first_tour_results);
    let second = max_index(first_tour_results);
    first_tour_results.sort((a, b) => b - a);
    let first_tour_winner = first_tour_results[0];
    if(has_absolute_win(first_tour_winner)) {
        return max_index(first_tour_results)[0];
    } else {
        return first_tour_winner > sum(votes) - first_tour_winner ?
            winner : second;
    }
}

function borda(candids) {
    let results = new Array(candids.length).fill(0);

    candids.forEach((row, x) => {
        row.forEach((elem, y) => {
            results[elem - 1] += grade(x, candids.length) * votes[y];
        });
    });

    return max_index(results);
}

function condorse(candids) {
    let results = comparative_votes(candids);

    return condorse_winner(results);
}

function coplend_sums(results) {
    let sums = [];
    
    results.forEach((row) => {
        sums.push(sum(row));
    });

    return sums;
}

function comparative_votes(candids) {
    let results = new Array(5).fill(new Array(3).fill(0));

    let transposed_candidates = transposed(candids);

    transposed_candidates.forEach((row, i) => {
        row.forEach((_, j) => {
            for (let ind = 0; ind < votes.length; ind++) {
                let cand = transposed_candidates[i].indexOf((j + 1));
                results[i][j] += votes[i] * is_greater(cand, transposed_candidates[ind].indexOf((j + 1)));
            }
        });
    });

    return results;
}

function condorse_winner(results) {
    let winner_counter = 0;
    let winners = [];

    results.forEach((row, i) => {
        for (let j = 0; j < row.length; j++) {
            if (results[i][j] < results[j][i]) {
                break;
            } else {
                winner_counter++;
            }
        }
        if (winner_counter == 3) {
            winners.push(i);
        }
        winner_counter = 0;
    });

    return (winners);
}

function is_greater(cand, j) {
    return j > cand ? 1 : 0;
}

function transposed(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function min(array) {
    let min = 100;

    array.forEach((elem) => {
        if (elem > 0)
            min = elem >= min ? min : elem;
    });

    return min;
}

function sum(array) {
    let sum = 0;
    for( let i = 0; i < array.length; i++ ){
        sum += parseInt( array[i], 10 );
    }
    return sum;
}



function votes_sum(array) {
    var result = 0;

    array.forEach((elem) => {
        result += votes[elem];
    });

    return result;
}
