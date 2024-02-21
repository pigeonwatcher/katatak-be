// describe("Testing for updateRemoteStudents Pure Function Challenge", () => {
//     const singleStudent = [
//         {
//             name: 'Euler', age: 27
//         }
//     ]
    
//     const remoteStudents = [
//         { name: 'Hypatia', age: 31 },
//         { name: 'Ramanujan', age: 22 },
//         { name: 'Tao', age: 47 }
//     ]

//     const mixedStudents = [
//         { name: 'Hypatia', age: 31, location: 'leeds' },
//         { name: 'Ramanujan', age: 22 },
//         { name: 'Tao', age: 47, location: 'manchester' }
//     ]

//     test("The function should return a new array with a fresh reference", () => {
//         expect(updateRemoteStudents(singleStudent)).toEqual(singleStudent);
//         expect(updateRemoteStudents(singleStudent)).not.toBe(singleStudent);
//     })
//     test("The function should update an array with one student with no locations only to be remote", () => {
//         //arrange
//         const output = [
//             {
//                 name: 'Euler', age: 27, location: 'remote'
//             }
//         ];
//         //act
//         const updatedStudent = updateRemoteStudents(singleStudent);
//         //assert
//         expect(updatedStudent).toEqual(output);
//     })
//     test("The function should update an array of remote students with their location", () => {
//         //arrange
//         const output = [
//             { name: 'Hypatia', age: 31, location: 'remote' },
//             { name: 'Ramanujan', age: 22, location: 'remote' },
//             { name: 'Tao', age: 47, location: 'remote' }
//         ];
//         //act
//         const updatedStudent = updateRemoteStudents(remoteStudents);
//         //assert
//         expect(updatedStudent).toEqual(output);
//     })
//     test("The function should update an array of students with mixed locations accurately", () => {
//         //arrange
//         const output = [
//             { name: 'Hypatia', age: 31, location: 'leeds' },
//             { name: 'Ramanujan', age: 22, location: 'remote' },
//             { name: 'Tao', age: 47, location: 'manchester' }
//         ]
//         //act
//         const updatedStudent = updateRemoteStudents(mixedStudents);
//         //assert
//         expect(updatedStudent).toEqual(output);
//     })
//     test("The function should not alter the original arrays", () => {
//         //arrange
//         const output1 = singleStudent;
//         const output2 = remoteStudents;
//         const output3 = mixedStudents;
//         //act
//         updateRemoteStudents(singleStudent);
//         updateRemoteStudents(remoteStudents);
//         updateRemoteStudents(mixedStudents);
//         //assert
//         expect(singleStudent).toBe(output1)
//         expect(remoteStudents).toBe(output2)
//         expect(mixedStudents).toBe(output3);
//     })
// })